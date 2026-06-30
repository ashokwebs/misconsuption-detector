import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[Error]', err.message);

  if (err.name === 'SyntaxError') {
    res.status(400).json({ error: 'Invalid JSON in request body' });
    return;
  }

  if (err.message.includes('Could not parse')) {
    res.status(502).json({ error: 'AI returned an unexpected response format. Please try again.' });
    return;
  }

  res.status(500).json({ error: err.message ?? 'Internal server error' });
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Not found' });
}
