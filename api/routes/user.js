const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// incoming requests to /user/signup
router.post('/signup', userController.signup);

// incoming requests to /user/login
router.post('/login', userController.login);

module.exports = router;