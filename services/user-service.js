const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createError = require('http-errors');
const keys = require('../config/keys');

const User = require('../models/User');

async function hashPassword(password, saltRounds = 10) {

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }
    catch (error) {
        return Promise.reject(createError(500, 'Error while hashing password'));
    }
}

async function registerUser(user) {

    console.log('Registering new user in user-service.js');

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
        return Promise.reject(createError(409, `User already exists with email ${user.email}`));
    }

    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password
    });

    newUser.password = await hashPassword(newUser.password);
    await newUser.save();

    return newUser;
}

async function loginUser(email, password) {

    const user = await User.findOne({ email });
    if (!user) {
        return Promise.reject(createError(404, 'Email not found'));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return Promise.reject(createError(401, 'Password incorrect'));
    }

    const payload = {
        id: user.id,
        name: user.name
    };

    const token = await jwt.sign(
        payload,
        keys.secretOrKey,
        {
            // 1 year in seconds
            expiresIn: 31556926
        }
    );

    return {
        success: true,
        token: `Bearer ${token}`
    };
}

module.exports = {
    registerUser,
    loginUser
};
