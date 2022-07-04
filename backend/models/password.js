const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(9)
    .has().uppercase()
    .has().lowercase()
    .has().digits()

module.exports = passwordSchema;