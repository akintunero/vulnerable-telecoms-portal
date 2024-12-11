import requests
import socket
import dns.resolver
import pysnmp
import ftplib
import redis
import paramiko
import os
from pysnmp.hlapi import *

def test_voip():
    print("Testing VoIP vulnerability...")
    with open('asterisk/config/sip.conf', 'r') as f:
        content = f.read()
        if 'flag1_voip_asterisk_2024' in content:
            print("✅ VoIP vulnerability found!")
        else:
            print("❌ VoIP vulnerability not found")

def test_billing_api():
    print("\nTesting Billing API vulnerability...")
    response = requests.get('http://localhost:5000/api/v1/bill?id=999')
    if 'flag2_billing_api_2024' in response.text:
        print("✅ Billing API vulnerability found!")
    else:
        print("❌ Billing API vulnerability not found")

def test_dns():
    print("\nTesting DNS vulnerability...")
    try:
        answers = dns.resolver.resolve('flag.telisp.com', 'TXT')
        for rdata in answers:
            if 'flag3_dns_bind_2024' in str(rdata):
                print("✅ DNS vulnerability found!")
                return
    except:
        pass
    print("❌ DNS vulnerability not found")

def test_snmp():
    print("\nTesting SNMP vulnerability...")
    with open('snmp/config/snmpd.conf', 'r') as f:
        content = f.read()
        if 'flag4_snmp_2024' in content:
            print("✅ SNMP vulnerability found!")
        else:
            print("❌ SNMP vulnerability not found")

def test_sql_injection():
    print("\nTesting SQL Injection vulnerability...")
    response = requests.get('http://localhost:4000/admin/search?query=%27+OR+%271%27%3D%271')
    if 'flag5_sql_injection_2024' in response.text:
        print("✅ SQL Injection vulnerability found!")
    else:
        print("❌ SQL Injection vulnerability not found")

def test_radius():
    print("\nTesting RADIUS vulnerability...")
    with open('freeradius/config/users', 'r') as f:
        content = f.read()
        if 'flag6_radius_2024' in content:
            print("✅ RADIUS vulnerability found!")
        else:
            print("❌ RADIUS vulnerability not found")

def test_throttling():
    print("\nTesting Throttling API vulnerability...")
    response = requests.get('http://localhost:5001/api/test?token=test_token_123')
    if 'flag7_throttle_2024' in response.text:
        print("✅ Throttling API vulnerability found!")
    else:
        print("❌ Throttling API vulnerability not found")

def test_router():
    print("\nTesting Router vulnerability...")
    with open('router-ui/index.html', 'r') as f:
        content = f.read()
        if 'flag8_router_2024' in content:
            print("✅ Router vulnerability found!")
        else:
            print("❌ Router vulnerability not found")

def test_dhcp():
    print("\nTesting DHCP vulnerability...")
    with open('dhcp/config/dhcpd.conf', 'r') as f:
        content = f.read()
        if 'flag9_dhcp_2024' in content:
            print("✅ DHCP vulnerability found!")
        else:
            print("❌ DHCP vulnerability not found")

def test_netflow():
    print("\nTesting Netflow vulnerability...")
    with open('netflow/data/capture.pcap', 'r') as f:
        content = f.read()
        if 'flag10_netflow_2024' in content:
            print("✅ Netflow vulnerability found!")
        else:
            print("❌ Netflow vulnerability not found")

def test_pdf():
    print("\nTesting PDF vulnerability...")
    with open('invoices/generate.py', 'r') as f:
        content = f.read()
        if 'flag11_pdf_2024' in content:
            print("✅ PDF vulnerability found!")
        else:
            print("❌ PDF vulnerability not found")

def test_redis():
    print("\nTesting Redis vulnerability...")
    response = requests.get('http://localhost:5002/redis-admin?cmd=get flag')
    if 'flag12_redis_2024' in response.text:
        print("✅ Redis vulnerability found!")
    else:
        print("❌ Redis vulnerability not found")

def test_email():
    print("\nTesting Email vulnerability...")
    with open('email-dump/data/admin.mbox', 'r') as f:
        content = f.read()
        if 'flag13_email_2024' in content:
            print("✅ Email vulnerability found!")
        else:
            print("❌ Email vulnerability not found")

def test_git():
    print("\nTesting Git vulnerability...")
    with open('git-repo/repos/telisp/.env', 'r') as f:
        content = f.read()
        if 'flag14_git_2024' in content:
            print("✅ Git vulnerability found!")
        else:
            print("❌ Git vulnerability not found")

def test_ftp():
    print("\nTesting FTP vulnerability...")
    with open('ftp/logs/xferlog', 'r') as f:
        content = f.read()
        if 'flag15_ftp_2024' in content:
            print("✅ FTP vulnerability found!")
        else:
            print("❌ FTP vulnerability not found")

def test_bgp():
    print("\nTesting BGP vulnerability...")
    with open('frr/config/bgpd.conf', 'r') as f:
        content = f.read()
        if 'flag16_bgp_2024' in content:
            print("✅ BGP vulnerability found!")
        else:
            print("❌ BGP vulnerability not found")

def test_social():
    print("\nTesting Social Media vulnerability...")
    with open('social/data/profile.jpg', 'r') as f:
        content = f.read()
        if 'flag17_social_2024' in content:
            print("✅ Social Media vulnerability found!")
        else:
            print("❌ Social Media vulnerability not found")

def test_remote():
    print("\nTesting Remote Access vulnerability...")
    with open('admin/backup_script.py', 'r') as f:
        content = f.read()
        if 'flag18_remote_2024' in content:
            print("✅ Remote Access vulnerability found!")
        else:
            print("❌ Remote Access vulnerability not found")

def test_irc():
    print("\nTesting IRC vulnerability...")
    with open('irc/logs/irc.log', 'r') as f:
        content = f.read()
        if 'flag19_irc_2024' in content:
            print("✅ IRC vulnerability found!")
        else:
            print("❌ IRC vulnerability not found")

def test_sms():
    print("\nTesting SMS API vulnerability...")
    response = requests.get('http://localhost:8000/api/sms/send?message=<script>alert(1)</script>&token=admin')
    if 'flag20_sms_xss_2024' in response.text:
        print("✅ SMS API vulnerability found!")
    else:
        print("❌ SMS API vulnerability not found")

def main():
    print("Starting vulnerability tests...\n")
    
    test_voip()
    test_billing_api()
    test_dns()
    test_snmp()
    test_sql_injection()
    test_radius()
    test_throttling()
    test_router()
    test_dhcp()
    test_netflow()
    test_pdf()
    test_redis()
    test_email()
    test_git()
    test_ftp()
    test_bgp()
    test_social()
    test_remote()
    test_irc()
    test_sms()

if __name__ == "__main__":
    main() 