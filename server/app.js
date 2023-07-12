const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const quizRoutes = require('./routes/quiz');

// Set up middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/quiz', quizRoutes);



module.exports = app;
