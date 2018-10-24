// Main components
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const userRouter = require('./Users/userController')

const server = express()
const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true
}

// middleware
server.use(helmet())
server.use(express.json())]
server.use(cors(corsOption))

// mongoose - local
mongoose
.connect("mongodb://localhost/Remindme")
.then(res => {
  console.log('-= Connected to mongo DB =-')
}).catch(err => {
  console.log("!Error, trouble connecting to mongo DB!")
})