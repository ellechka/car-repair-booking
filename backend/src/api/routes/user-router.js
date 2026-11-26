import express from 'express';
import {body} from 'express-validator';
import {postUser} from '../controllers/user-controller.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

// Register a new user route with validation for name, email, phone, and password
userRouter
  .route('/')
  .post(
    body('name').trim().isLength({min: 1, max: 120}).withMessage('required, max 120 characters'),
    body('email').trim().customSanitizer((value) => value.toLowerCase()).isEmail().withMessage('must be a valid email'),
    body('phone').optional({values: 'falsy'}).trim().isLength({max: 40}),
    body('password').isLength({min: 8}).withMessage('min. 8 characters'),
    validationErrors,
    postUser
  );

export default userRouter;
