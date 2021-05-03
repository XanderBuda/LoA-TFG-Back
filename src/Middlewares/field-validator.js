const { validationResult, check } = require('express-validator');

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ error: errors.mapped() });

    next();
}

const validations = {};

validations.postUserChecks = [
    check('username', 'Username is required').trim().not().isEmpty(),
    check('password', 'Password is required').trim().not().isEmpty(),
    check('email', 'Email is required').trim().isEmail(),
    validator
]

validations.postTeamChecks = [
    check('name', 'Name is required').trim().not().isEmpty(),
    validator
]

validations.postTournamentChecks = [
    check('name', 'Name is required').trim().not().isEmpty(),
    check('size', 'Size is required').trim().not().isEmpty(),
    validator
]

validations.postLogin = [
    check('email', 'Email is required').trim().isEmail(),
    check('password', 'Password is required').trim().not().isEmpty(),
    validator
]

module.exports = validations;