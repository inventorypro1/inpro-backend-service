const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const userValidation = require('./validation/userValidation');

router.post('/register', userValidation.validateRegister, userController.registerUser);
router.post('/login', userValidation.validateLogin, userController.loginUser);

module.exports = router;
