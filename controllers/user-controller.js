const userService = require('../services/user-service');

function registerUser(request, response, next) {

    const user = request.body;

    return userService.registerUser(user)
        .then((result) => response.status(201).json(result))
        .catch((err) => next(err));
}

function loginUser(request, response, next) {

    const email = request.body.email;
    const password = request.body.password;

    return userService.loginUser(email, password)
        .then((result) => response.status(200).json(result))
        .catch((err) => next(err));
}

module.exports = {
    registerUser,
    loginUser
};
