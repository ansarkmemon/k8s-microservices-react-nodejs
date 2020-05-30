import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { json } from 'body-parser';
import { NotFoundError, errorHandler } from '@actickets/common';

;


const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))



app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };