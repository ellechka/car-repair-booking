import promisePool from '../../utils/database.js';
// Find a user by email in the database
const findUserByEmail = async (email) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

// Add a new user to the database
const addUser = async (user) => {
  const {name, email, phone, password_hash} = user;
  // role is always 'customer' (the table default) for new sign-ups
  const sql = `INSERT INTO users (name, email, phone, password_hash)
               VALUES (?, ?, ?, ?)`;
  const params = [name, email, phone || null, password_hash];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) {
    return false;
  }
  return {id: result.insertId};
};

export {findUserByEmail, addUser};
