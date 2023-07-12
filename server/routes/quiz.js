const express = require('express');
const router = express.Router();

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

// Route for handling location_button action
router.post('/location-action', (req, res) => {
    const selectedCard = req.body.card;
    location.push(selectedCard);
    res.send(location);
    console.log(location);
});
 
// Route for handling types_button action
router.post('/type-action', (req, res) => {
    const selectedCard = req.body.card;
    types.push(selectedCard);
    console.log(types);
    // send the location & types array to Rob's api
    res.send(recommendations);
});

module.exports = router;
