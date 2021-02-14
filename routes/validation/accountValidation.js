// Leaving query as a unused variable to showcase that this is how query parameters of a request are checked
const {
 check, query, param, validationResult
} = require('express-validator');

module.exports.createAccount = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('\'name\' field is required')
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be between 3 and 20 characters long'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('\'email\' field is required')
        .bail()
        .isEmail()
        .withMessage('Email provided is not valid')
        .normalizeEmail(),
    check('password'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports.getAccount = [
    param('accountId')
        .not()
        .isEmpty()
        .withMessage('Account ID must be provided')
        .bail()
        .isString()
        .withMessage('Account ID is not a valid object ID')
        .bail()
        .isLength({ min: 24, max: 24 })
        .withMessage('Account ID is not a valid object ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
