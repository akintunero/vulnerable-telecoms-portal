import socket
import struct
import json
from datetime import datetime

def parse_netflow(data):
    # Basic NetFlow v5 header parsing
    header = struct.unpack('!HHIIIII', data[:24])
    version = header[0]
    count = header[1]
    
    flows = []
    offset = 24
    
    for _ in range(count):
        if offset + 48 > len(data):
            break
            
        flow = struct.unpack('!IIIIHHBBBBHHIIIIII', data[offset:offset+48])
        flows.append({
            'src_ip': socket.inet_ntoa(struct.pack('!I', flow[0])),
            'dst_ip': socket.inet_ntoa(struct.pack('!I', flow[1])),
            'src_port': flow[4],
            'dst_port': flow[5],
            'protocol': flow[6],
            'packets': flow[8],
            'bytes': flow[9]
        })
        offset += 48
    
    return flows

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(('0.0.0.0', 9995))
    
    print("NetFlow collector started on port 9995")
    
    while True:
        data, addr = sock.recvfrom(4096)
        flows = parse_netflow(data)
        
        timestamp = datetime.now().isoformat()
        for flow in flows:
            flow['timestamp'] = timestamp
            print(json.dumps(flow))

if __name__ == '__main__':
    main() 