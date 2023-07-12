const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create the Express app
const app = express();

// Set up middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Array to store user selected location
let location = [];
// Array to store user selected types
let types = [];
// Location examples
const recommendations = [
    { id: 1, name: 'Location1' },
    { id: 2, body: 'Location2' },
    { id: 3, name: 'Location3' },
    { id: 4, name: 'Location4' },
    { id: 5, name: 'Location5' }
];

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Route for handling location_button action
app.post('/location-action', (req, res) => {
    const selectedCard = req.body.card;
    location.push(selectedCard);
    res.send(location);
    console.log(location);
});

// Route for handling types_button action
app.post('/type-action', (req, res) => {
    const selectedCard = req.body.card;
    types.push(selectedCard);
    console.log(types);
    // send the location & types array to Rob's api
    res.send(recommendations);
});

// Serve the React app on the root URL
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
