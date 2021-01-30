
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createError = require('http-errors')
const keys = require("./../config/keys");

const User = require("../models/User");

async function registerUser(user) {

    console.log('Registering new user in user-service.js')

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
        return Promise.reject(createError(400, `User already exists with email ${user.email}`));
    }

    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password
    });


    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
        });
    });

    return newUser;
}


async function loginUser(email, password) {

    const user = await User.findOne({ email });
    if (!user) {
        return Promise.reject(createError(404, 'Email not found'));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return Promise.reject(createError(400, 'Password incorrect'));
    }

    const payload = {
        id: user.id,
        name: user.name
    };

    const token = await jwt.sign(
        payload,
        keys.secretOrKey,
        {
            expiresIn: 31556926 // 1 year in seconds
        }
    );

    return {
        success: true,
        token: 'Bearer ' + token
    }
}


module.exports = {
    registerUser,
    loginUser
}