import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import analyzeRouter from './routes/analyze';
import sessionsRouter from './routes/sessions';
import authRouter from './routes/auth';
import helmet from 'helmet';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors()); // Allow all origins for Netlify
app.use(express.json());

// Rate limiting — 30 AI requests per minute per IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Please wait a moment.' },
});

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/analyze', aiLimiter, analyzeRouter);
app.use('/api/sessions', sessionsRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
