import app from './app';
import { config } from './config/config';

// Server configuration
const port = process.env.PORT || 3000;

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 