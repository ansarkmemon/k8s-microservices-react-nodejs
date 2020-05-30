import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { json } from 'body-parser';
import { NotFoundError, errorHandler, currentUser } from '@actickets/common';

import { createTicketRouter } from './routes/new-ticket';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)

app.use(createTicketRouter)

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };