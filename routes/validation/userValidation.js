// Leaving query as a unused variable to showcase that this is how query parameters of a request are checked
const { check, query, validationResult } = require('express-validator');

module.exports.validateLogin = [
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('\'email\' field is required')
        .bail()
        .isEmail()
        .withMessage('Email provided is not valid')
        .normalizeEmail(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('\'password\' field is required')
        .bail()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports.validateRegister = [
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
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('\'password\' field is required')
        .bail()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters'),
    check('password2')
        .trim()
        .not()
        .isEmpty()
        .withMessage('\'password2\' field is required')
        .bail()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters')
        .custom(async (password2, { req }) => {
            const password = req.body.password;

            if (password !== password2) {
                throw new Error('Passwords must be the same');
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
