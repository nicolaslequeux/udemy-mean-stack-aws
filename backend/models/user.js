const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // unique is not a validator, instead we use an npm package: mongoose-unique-validator
    password: { type: String, required: true, minLength: 3 },
});

userSchema.plugin(uniqueValidator); // we will now get an error if we try saving a new user with an already existing user 

module.exports = mongoose.model('User', userSchema);

