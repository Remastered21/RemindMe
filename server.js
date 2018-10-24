// Main components
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Routes (not yet implemented)
// const userRouter = require('./Users/userController');

const server = express();
const corsOption = {
	origin: 'http://localhost:3000',
	credentials: true
};

// middleware
server.use(helmet());
server.use(express.json());
server.use(cors(corsOption));

// mongoose
mongoose
	.connect('mongodb://localhost/Remindme') // local
	// .connect('mongodb://admin:adminpw@ds239940.mlab.com:39940/lambda-note_h') // mlab
	.then((res) => {
		console.log('-= Connected to mongo DB =-');
	})
	.catch((err) => {
		console.log('!Error, trouble connecting to mongo DB!');
	});

// sanity check
server.get('/', (req, res) => {
	res.json({ Message: 'API is working!' });
});

const port = process.env.PORT || 5000;
server.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`== Server running on port ${port} ==`);
});
