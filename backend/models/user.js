// Requires
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, validate: [validateEmail, 'Valid email address required'], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);