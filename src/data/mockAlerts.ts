export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export const mockAlerts: Alert[] = [
  {
    id: 'A1',
    type: 'error',
    title: 'High CPU Usage',
    message: 'CPU usage exceeded 90% on core router R1',
    timestamp: '2024-02-28 14:30:00',
    source: 'System Monitor',
    status: 'active'
  },
  {
    id: 'A2',
    type: 'warning',
    title: 'Low Disk Space',
    message: 'Storage server S1 has less than 10% free space',
    timestamp: '2024-02-28 14:25:00',
    source: 'Storage Monitor',
    status: 'active'
  },
  {
    id: 'A3',
    type: 'info',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully',
    timestamp: '2024-02-28 14:00:00',
    source: 'Backup System',
    status: 'acknowledged'
  },
  {
    id: 'A4',
    type: 'success',
    title: 'Service Restored',
    message: 'API service has been restored after maintenance',
    timestamp: '2024-02-28 13:45:00',
    source: 'Service Monitor',
    status: 'resolved'
  },
  {
    id: 'A5',
    type: 'error',
    title: 'Network Latency',
    message: 'High latency detected on backbone link B1',
    timestamp: '2024-02-28 13:30:00',
    source: 'Network Monitor',
    status: 'active'
  },
  {
    id: 'A6',
    type: 'warning',
    title: 'Memory Usage',
    message: 'Memory usage above 85% on server S2',
    timestamp: '2024-02-28 13:15:00',
    source: 'System Monitor',
    status: 'active'
  },
  {
    id: 'A7',
    type: 'info',
    title: 'Security Scan',
    message: 'Scheduled security scan completed',
    timestamp: '2024-02-28 13:00:00',
    source: 'Security System',
    status: 'acknowledged'
  },
  {
    id: 'A8',
    type: 'success',
    title: 'Update Complete',
    message: 'System update completed successfully',
    timestamp: '2024-02-28 12:45:00',
    source: 'Update Manager',
    status: 'resolved'
  }
]; 