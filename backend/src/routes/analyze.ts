import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { analyzeAnswer } from '../lib/groq';
import { store } from '../lib/store';
import { Submission } from '../types';

const router = Router();

const AnalyzeSchema = z.object({
  sessionId: z.string().min(1),
  topic: z.string().min(1),
  question: z.string().min(10),
  answer: z.string().min(5, 'Answer must be at least 5 characters'),
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = AnalyzeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }

    const { sessionId, topic, question, answer } = parsed.data;

    const diagnosis = await analyzeAnswer(question, answer);

    const submission: Submission = {
      id: uuidv4(),
      sessionId,
      topic,
      question,
      answer,
      diagnosis,
      timestamp: new Date().toISOString(),
    };

    store.addSubmission(submission);

    res.json({ submission });
  } catch (err) {
    next(err);
  }
});

export default router;
