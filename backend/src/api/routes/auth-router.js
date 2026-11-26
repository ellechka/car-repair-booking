import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

const authRouter = express.Router();

// Login route with validation for email and password
authRouter
  .route('/login')
  .post(
    body('email').trim().customSanitizer((value) => value.toLowerCase()).isEmail().withMessage('must be a valid email'),
    body('password').notEmpty().withMessage('required'),
    validationErrors,
    postLogin
  );

authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
