#!/usr/bin/env python3
import os
import paramiko
import time
import logging
from pathlib import Path
from cryptography.fernet import Fernet

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='backup.log'
)
logger = logging.getLogger(__name__)

# Load encryption key from environment
ENCRYPTION_KEY = os.environ.get('BACKUP_ENCRYPTION_KEY', Fernet.generate_key())
cipher_suite = Fernet(ENCRYPTION_KEY)

# Load SSH key from environment or file
def load_ssh_key():
    key_path = os.environ.get('SSH_KEY_PATH', '/etc/backup/ssh_key')
    if os.path.exists(key_path):
        with open(key_path, 'r') as f:
            return f.read()
    return os.environ.get('SSH_KEY')

def backup_database():
    try:
        # Create backup directory if it doesn't exist
        backup_dir = Path('/var/backups/telisp')
        backup_dir.mkdir(parents=True, exist_ok=True)
        
        # Generate backup filename with timestamp
        timestamp = time.strftime('%Y%m%d_%H%M%S')
        backup_file = backup_dir / f'backup_{timestamp}.sql'
        
        # Create SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Load and decrypt SSH key
        ssh_key = load_ssh_key()
        if not ssh_key:
            raise ValueError("SSH key not found")
        
        # Connect using key
        ssh.connect(
            'backup.telisp.com',
            username='backup',
            pkey=paramiko.RSAKey.from_private_key_file(ssh_key)
        )
        
        # Execute backup command
        stdin, stdout, stderr = ssh.exec_command('pg_dump -U postgres telisp')
        
        # Check for errors
        if stderr.read():
            raise Exception("Backup command failed")
        
        # Save backup with encryption
        with open(backup_file, 'wb') as f:
            encrypted_data = cipher_suite.encrypt(stdout.read())
            f.write(encrypted_data)
        
        # Close connection
        ssh.close()
        
        logger.info(f"Backup completed successfully: {backup_file}")
        return True
    except Exception as e:
        logger.error(f"Backup failed: {str(e)}")
        return False

def cleanup_old_backups(max_age_days=7):
    try:
        backup_dir = Path('/var/backups/telisp')
        current_time = time.time()
        
        for backup_file in backup_dir.glob('backup_*.sql'):
            file_age = current_time - backup_file.stat().st_mtime
            if file_age > (max_age_days * 86400):  # Convert days to seconds
                backup_file.unlink()
                logger.info(f"Deleted old backup: {backup_file}")
    except Exception as e:
        logger.error(f"Cleanup failed: {str(e)}")

if __name__ == "__main__":
    if backup_database():
        cleanup_old_backups() 