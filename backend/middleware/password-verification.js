const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, "The password must contain at least 8 characters, one adjective, one capital and one number", { 'content-type': 'application/json' });
        res.end('Password format incorrect');
    } else {
        next();
    }
};