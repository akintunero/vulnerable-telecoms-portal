import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Simulate network monitoring data collection
    const networkData = [
      {
        node_id: 'NYC-01',
        metrics: {
          uptime: 99.8 + (Math.random() - 0.5) * 0.4,
          latency: 12 + (Math.random() - 0.5) * 4,
          bandwidth_usage: 67 + (Math.random() - 0.5) * 20,
          packet_loss: Math.random() * 0.1,
          connections: 12450 + Math.floor((Math.random() - 0.5) * 1000)
        }
      },
      {
        node_id: 'LAX-02',
        metrics: {
          uptime: 99.5 + (Math.random() - 0.5) * 0.4,
          latency: 15 + (Math.random() - 0.5) * 4,
          bandwidth_usage: 82 + (Math.random() - 0.5) * 20,
          packet_loss: Math.random() * 0.1,
          connections: 9876 + Math.floor((Math.random() - 0.5) * 800)
        }
      },
      {
        node_id: 'CHI-03',
        metrics: {
          uptime: 98.9 + (Math.random() - 0.5) * 0.4,
          latency: 18 + (Math.random() - 0.5) * 4,
          bandwidth_usage: 91 + (Math.random() - 0.5) * 10,
          packet_loss: Math.random() * 0.2,
          connections: 8234 + Math.floor((Math.random() - 0.5) * 600)
        }
      }
    ];

    const timestamp = new Date().toISOString();
    const metricsToInsert = [];

    for (const node of networkData) {
      // Update node status
      const loadPercentage = Math.round(node.metrics.bandwidth_usage);
      let status = 'online';
      
      if (node.metrics.uptime < 99.0 || loadPercentage > 90) {
        status = 'warning';
      }
      if (node.metrics.uptime < 98.0) {
        status = 'offline';
      }

      await supabaseClient
        .from('network_nodes')
        .update({
          load_percentage: loadPercentage,
          active_connections: node.metrics.connections,
          uptime_percentage: Number(node.metrics.uptime.toFixed(2)),
          status,
          last_check: timestamp,
          updated_at: timestamp
        })
        .eq('node_id', node.node_id);

      // Insert metrics
      Object.entries(node.metrics).forEach(([metric_type, value]) => {
        metricsToInsert.push({
          metric_type,
          value: Number(value.toFixed(2)),
          unit: getMetricUnit(metric_type),
          node_id: node.node_id,
          timestamp
        });
      });

      // Generate alerts for critical conditions
      if (node.metrics.uptime < 99.0) {
        await supabaseClient
          .from('security_events')
          .insert({
            event_type: 'warning',
            title: `Network node ${node.node_id} experiencing issues`,
            description: `Uptime dropped to ${node.metrics.uptime.toFixed(2)}%`,
            affected_resource: node.node_id,
            severity_score: Math.round((100 - node.metrics.uptime) * 10),
            status: 'investigating'
          });
      }

      if (loadPercentage > 90) {
        await supabaseClient
          .from('security_events')
          .insert({
            event_type: 'warning',
            title: `High load detected on ${node.node_id}`,
            description: `Bandwidth usage at ${loadPercentage}%`,
            affected_resource: node.node_id,
            severity_score: loadPercentage - 50,
            status: 'monitoring'
          });
      }
    }

    // Insert all metrics
    if (metricsToInsert.length > 0) {
      await supabaseClient
        .from('network_metrics')
        .insert(metricsToInsert);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        timestamp,
        nodesUpdated: networkData.length,
        metricsInserted: metricsToInsert.length
      }),
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

function getMetricUnit(metricType: string): string {
  switch (metricType) {
    case 'uptime': return 'percentage';
    case 'latency': return 'ms';
    case 'bandwidth_usage': return 'percentage';
    case 'packet_loss': return 'percentage';
    case 'connections': return 'count';
    default: return 'unit';
  }
}