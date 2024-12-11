#!/usr/bin/env python3
import requests
import sys
import time
import json
from concurrent.futures import ThreadPoolExecutor

class ServiceTester:
    def __init__(self, base_url="http://localhost"):
        self.base_url = base_url
        self.services = {
            'admin': {'port': 4000, 'path': '/login'},
            'invoices': {'port': 7000, 'path': '/'},
            'validator': {'port': 5001, 'path': '/validate'},
            'social': {'port': 3000, 'path': '/'},
            'router-ui': {'port': 8080, 'path': '/'},
            'sms-api': {'port': 8000, 'path': '/'}
        }
        
    def test_service(self, service_name, service_info):
        """Test if a service is responding"""
        url = f"{self.base_url}:{service_info['port']}{service_info['path']}"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"[+] {service_name} is up and running")
                return True
            else:
                print(f"[-] {service_name} returned status code {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"[-] {service_name} is not responding: {str(e)}")
            return False
            
    def test_flag_validator(self):
        """Test the flag validator service"""
        url = f"{self.base_url}:5001/validate"
        test_flag = "TELISP{TEST_FLAG}"
        
        try:
            response = requests.post(url, json={'flag': test_flag})
            if response.status_code == 400:  # Expected for invalid flag
                print("[+] Flag validator is working correctly")
                return True
            else:
                print("[-] Flag validator returned unexpected status code")
                return False
        except requests.exceptions.RequestException as e:
            print(f"[-] Flag validator is not responding: {str(e)}")
            return False
            
    def test_all_services(self):
        """Test all services concurrently"""
        print("[*] Starting service tests...")
        
        with ThreadPoolExecutor(max_workers=len(self.services)) as executor:
            futures = []
            for service_name, service_info in self.services.items():
                futures.append(executor.submit(self.test_service, service_name, service_info))
                
            # Wait for all tests to complete
            results = [f.result() for f in futures]
            
        # Test flag validator separately
        validator_result = self.test_flag_validator()
        results.append(validator_result)
        
        # Print summary
        print("\n[*] Test Summary:")
        print(f"Total services tested: {len(results)}")
        print(f"Services up: {sum(results)}")
        print(f"Services down: {len(results) - sum(results)}")
        
        return all(results)

def main():
    if len(sys.argv) > 1:
        base_url = sys.argv[1]
    else:
        base_url = "http://localhost"
        
    tester = ServiceTester(base_url)
    success = tester.test_all_services()
    
    if success:
        print("\n[+] All services are up and running!")
        sys.exit(0)
    else:
        print("\n[-] Some services are not responding")
        sys.exit(1)

if __name__ == "__main__":
    main() 