const express = require('express');
const router = express.Router();

const User = require('./userModel');
const jwt = require('jsonwebtoken');
// const { authenticate } = require('../middlewares');

// get information regarding specific user
router.get('/:id', (req, res) => {
	const { id } = req.params;

	User.findById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// Register new user
router.post('/register', (req, res) => {
	const { username, password } = req.body;
	const user = new User({ username, password });

	user.save((err, user) => {
		if (err) return res.send(err);
		const token = getTokenForUser({
			username: user.username
		});
		res.json({ token });
	});
});

// Token receiver
const getTokenForUser = (userObject) => {
	return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

module.exports = router;
