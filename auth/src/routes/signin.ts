import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from './../utils/password';
import { BadRequestError } from './../errors/bad-request-error';
import { validateRequest } from './../middlewares/validate-request';

const validationObj = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must provide a valid password')
];

const router = express.Router();

router.post('/api/users/signin', [...validationObj], validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const isPasswordMatch = await Password.compare(existingUser.password, password);

  if (!isPasswordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  const userJWT = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

  req.session = { jwt: userJWT }

  res.status(200).send(existingUser)
});

export { router as signinRouter };