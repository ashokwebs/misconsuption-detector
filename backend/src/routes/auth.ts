import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../lib/store';
import { User } from '../types';

const router = Router();

const AuthSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['student', 'teacher']).optional().default('student'),
});

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = AuthSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }

    const { username, password, role } = parsed.data;

    const user: User = {
      id: uuidv4(),
      username,
      password, // In a real app, hash this!
      role,
    };

    const success = store.registerUser(user);
    if (!success) {
      if (role === 'teacher') {
        res.status(403).json({ error: 'Teacher registration is disabled. Contact administrator.' });
      } else {
        res.status(400).json({ error: 'Username already exists' });
      }
      return;
    }

    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    next(err);
  }
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password required' });
      return;
    }

    const user = store.getUserByUsername(username);
    
    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    next(err);
  }
});

export default router;
