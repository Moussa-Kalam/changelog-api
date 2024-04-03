import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  console.log('Hello from express');
  res.status(200).json({ message: 'Hello' });
});

export default app;
