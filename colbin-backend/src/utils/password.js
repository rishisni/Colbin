// backend/src/utils/password.js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPassword = (plain) => bcrypt.hash(plain, saltRounds);
const comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);
module.exports = { hashPassword, comparePassword };