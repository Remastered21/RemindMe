const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 11;

const User = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	subscription: {
		type: Boolean,
		default: true
	}
});

// pre-hook for the document -- before saving it
User.pre('save', function(next) {
	// once password is encrypted, call next()
	bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

// Mongoose Method
User.methods.checkPassword = function(plainPW, cb) {
	// controller needs to send info here for password comparison
	// once user is found, compared the encrypted and plaintext PW
	bcrypt.compare(plainPW, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', User);
