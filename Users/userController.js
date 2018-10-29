const express = require('express');
const router = express.Router();

const User = require('./userModel');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware');

// debug: get all the users
router.get('/', authenticate, (req, res) => {
	let query = User.find();
	1;
	if (req.decoded) {
		query
			.then((users) => {
				res.status(200).json(users);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} else {
		return res.status(422).json({ error: `Can't get the users!` });
	}
});

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

// Sign in
router.post('/login', (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }, (err, user) => {
		if (err) {
			res.status(403).json({ error: 'Invalid Username/Password' });
			return;
		}
		if (user === null) {
			res.status(422).json({ error: 'No user with that username in our DB' });
			return;
		}
		// This uses User.method from our model.
		user.checkPassword(password, (nonMatch, hashMatch) => {
			if (nonMatch !== null) {
				res.status(422).json({ error: 'Password does not match' });
				return;
			}
			if (hashMatch) {
				const payload = {
					username: user.username
				}; // what will determine our payload.
				const token = jwt.sign(payload, secret); // creates our JWT with a secret and a payload and a hash.
				res.json({ token }); // sends the token back to the client
			}
		});
	});
});

// Token receiver
const getTokenForUser = (userObject) => {
	return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

module.exports = router;
