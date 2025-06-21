import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FraudDetectionRequest {
  customerId: string;
  location: string;
  verificationMethod: string;
  reason: string;
  timeOfRequest: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { customerId, location, verificationMethod, reason, timeOfRequest }: FraudDetectionRequest = await req.json()

    // Fraud detection algorithm
    let riskScore = 0;
    const riskFactors: string[] = [];

    // 1. Check for multiple requests from same customer in short time
    const { data: recentRequests } = await supabaseClient
      .from('sim_swap_requests')
      .select('*')
      .eq('customer_id', customerId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (recentRequests && recentRequests.length > 1) {
      riskScore += 40;
      riskFactors.push('Multiple requests in 24 hours');
    }

    // 2. Location-based risk assessment
    const { data: customer } = await supabaseClient
      .from('customers')
      .select('address')
      .eq('id', customerId)
      .single()

    if (customer && customer.address) {
      const customerState = customer.address.split(',').pop()?.trim();
      const requestState = location.split(',').pop()?.trim();
      
      if (customerState !== requestState) {
        riskScore += 25;
        riskFactors.push('Request from different state');
      }
    }

    // 3. Verification method risk
    if (verificationMethod.toLowerCase().includes('failed')) {
      riskScore += 50;
      riskFactors.push('Failed verification attempt');
    } else if (verificationMethod.toLowerCase().includes('sms')) {
      riskScore += 15;
      riskFactors.push('SMS-only verification');
    }

    // 4. Reason-based risk
    if (reason.toLowerCase().includes('lost') || reason.toLowerCase().includes('stolen')) {
      riskScore += 20;
      riskFactors.push('Lost/stolen device claim');
    }

    // 5. Time-based risk (requests outside business hours)
    const requestHour = new Date(timeOfRequest).getHours();
    if (requestHour < 8 || requestHour > 18) {
      riskScore += 10;
      riskFactors.push('Request outside business hours');
    }

    // 6. Check for known fraud patterns
    const suspiciousLocations = ['Miami, FL', 'Detroit, MI', 'Las Vegas, NV'];
    if (suspiciousLocations.some(loc => location.includes(loc))) {
      riskScore += 15;
      riskFactors.push('Request from high-risk location');
    }

    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100);

    // Determine risk level
    let riskLevel: string;
    if (riskScore >= 70) {
      riskLevel = 'HIGH';
    } else if (riskScore >= 40) {
      riskLevel = 'MEDIUM';
    } else {
      riskLevel = 'LOW';
    }

    // Log security event if high risk
    if (riskScore >= 70) {
      await supabaseClient
        .from('security_events')
        .insert({
          event_type: 'warning',
          title: 'High-risk SIM swap request detected',
          description: `SIM swap request with risk score ${riskScore}. Risk factors: ${riskFactors.join(', ')}`,
          affected_resource: `Customer ID: ${customerId}`,
          severity_score: riskScore,
          status: 'investigating'
        });
    }

    const response = {
      riskScore,
      riskLevel,
      riskFactors,
      recommendation: riskScore >= 70 ? 'REJECT' : riskScore >= 40 ? 'MANUAL_REVIEW' : 'APPROVE',
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
