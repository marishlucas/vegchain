import { NextFunction, Request, Response } from 'express';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.status(400).send('Missing API Key');
    return;
  }

  if (apiKey !== process.env.API_KEY) {
    console.log(apiKey, process.env.API_KEY);
    // handle invalid API key
    res.status(403).send('Invalid API Key');
    return;
  }

  next();
};
