import bcrypt from 'bcrypt';
import {addUser} from '../models/user-model.js';

/* register a new customer */
const postUser = async (req, res, next) => {
  const password_hash = await bcrypt.hash(req.body.password, 10);
  const result = await addUser({...req.body, password_hash});
  if (!result) {
    const error = new Error('User could not be added');
    error.status = 400;
    return next(error);
  }
  res.status(201).json({message: 'New user added.', result});
};

export {postUser};
