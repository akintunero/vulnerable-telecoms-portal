import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import customerRoutes from './routes/customers';
import networkRoutes from './routes/network';
import ticketRoutes from './routes/tickets';
import simSwapRoutes from './routes/simSwap';
import financialRoutes from './routes/financial';
import securityRoutes from './routes/security';
import changeRequestRoutes from './routes/changeRequests';
import complianceRoutes from './routes/compliance';
import servicesRoutes from './routes/services';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Telco Admin API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      customers: '/api/customers',
      network: '/api/network',
      tickets: '/api/tickets',
      simSwap: '/api/sim-swap',
      financial: '/api/financial',
      security: '/api/security',
      changeRequests: '/api/change-requests',
      compliance: '/api/compliance'
    },
    health: '/health'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/sim-swap', simSwapRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/change-requests', changeRequestRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/services', servicesRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Internal test route (obscure)
app.get('/api/_sysinfo', (req, res) => {
  res.json({ env: process.env.NODE_ENV, db: process.env.DB_HOST, jwt: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0 });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: err.message, stack: err.stack, env: process.env });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
