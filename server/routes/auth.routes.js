const express = require('express');
const { login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Login route
router.post('/login', login);

// Get current user route
router.get('/me', protect, getMe);

module.exports = router;