import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByEmail} from '../models/user-model.js';
import 'dotenv/config';

// Login function to authenticate a user and return a JWT token
const postLogin = async (req, res, next) => {
  const user = await findUserByEmail(req.body.email);
  // same message for wrong email and wrong password
  const passwordMatch =
    user && (await bcrypt.compare(req.body.password, user.password_hash));
  if (!passwordMatch || !user.is_active) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    return next(error);
  }


  const userWithNoPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({user: userWithNoPassword, token});
};

/* user decoded from the token */
const getMe = (req, res) => {
  res.json({message: 'token ok', user: res.locals.user});
};

export {postLogin, getMe};
