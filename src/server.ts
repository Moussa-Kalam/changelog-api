import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import router from './router';
import cors from 'cors';
import { protect } from './utils/auth';
import { createNewUser, signIn } from './handlers/user';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  console.log('Hello from express');
  res.status(200).json({ message: 'Hello' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/sign-in', signIn);

export default app;
