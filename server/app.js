const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const quizRoutes = require('./routes/quiz');

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// Set up middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'  
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/quiz', quizRoutes);


// Serve the React app on the root URL
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

module.exports = app;
