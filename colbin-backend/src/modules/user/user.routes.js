// backend/src/user/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middelware/auth.middelware');

// The '/register' endpoint maps to the register function in the controller
router.post('/register', userController.register);

// The '/login' endpoint maps to the login function in the controller
router.post('/login', userController.login);

// The '/profile' endpoint is protected by the authMiddleware before calling the controller
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;