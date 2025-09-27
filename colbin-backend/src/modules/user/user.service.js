const { db } = require('../../_helper/db'); 
const { hashPassword, comparePassword } = require('../../utils/password');
const { generateToken } = require('../../utils/jwt');

const registerUser = async ({ email, password, firstName, lastName }) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) { throw new Error('User with this email already exists.'); }
  const hashedPassword = await hashPassword(password);
  await User.create({ email, password: hashedPassword, firstName, lastName });
};



const loginUser = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) { throw new Error('Invalid credentials.'); }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) { throw new Error('Invalid credentials.'); }
    await user.update({ lastLoggedAt: new Date() });
  const token = generateToken({ id: user.id, email: user.email });
  return { token, user };
};

const getUserProfile = async (userId) => {
  const user = await db.User.findByPk(userId, { attributes: ['id', 'email', 'firstName', 'lastName', 'createdAt','lastLoggedAt'] });
  if (!user) { throw new Error('User not found.'); }
  return user;
};

module.exports = { registerUser, loginUser, getUserProfile };