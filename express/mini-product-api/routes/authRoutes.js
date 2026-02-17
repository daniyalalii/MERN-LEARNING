const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateSignup, validateLogin} = require('../middleware/validation');
const {protect} = require('../middleware/auth');

// public routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

// protected route
router.get('/me', protect, authController.getMe);

module.exports = router;