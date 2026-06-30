import { Router, Request, Response } from 'express';
import { store } from '../lib/store';

const router = Router();

// Get stats for a specific session (teacher view)
router.get('/:sessionId/stats', (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const stats = store.getSessionStats(sessionId);
  res.json(stats);
});

// Get all submissions for a session
router.get('/:sessionId/submissions', (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const submissions = store.getSubmissions(sessionId);
  res.json({ submissions });
});

export default router;
