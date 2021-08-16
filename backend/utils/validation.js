const { check, validationResult } = require('express-validator');

const { User } = require('../db/models');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
];

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid email.')
        .isEmail()
        .withMessage('Please provide a valid email.')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use by another account.');
                    }
                });
        }),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

validateStore = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a store/restaurant name with at least 4 characters.')
        .isLength({ min: 4 })
        .withMessage('Please provide a store/restaurant name with at least 4 characters.'),
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a url to a photo of your store/restaurant.'),
    handleValidationErrors,
];

validatePoutine = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your poutine with at least 4 characters.')
        .isLength({ min: 4 })
        .withMessage('Please provide a name for your poutine with at least 4 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description of your poutine with at least 4 characters.')
        .isLength({ min: 4 })
        .withMessage('Please provide a description of your poutine with at least 4 characters.'),
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a url to a photo of your poutine dish.'),
    handleValidationErrors,
];


module.exports = {
    handleValidationErrors,
    validateLogin,
    validateSignup,
    validateStore,
    validatePoutine,
};
