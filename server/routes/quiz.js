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

// Route for handling location_button
router.post('/location-action', (req, res) => {
    const selectedCard = req.body.card;
    if (!selectedCard) {
        return res.status(400).json({ error: 'No place selected' })
    }
    location.push(selectedCard);
    console.log(location);
    res.status(200).json({});
});
 
// Route for handling types_button
router.post('/type-action', (req, res) => {
    const selectedCard = req.body.card;
    if (!selectedCard) {
        return res.status(400).json({ error: 'No type selected' })
    }
    types.push(selectedCard);
    console.log(types);
    res.status(200).json({});
});

// Route for handling interest_level_button
router.get('/type-action', (req, res) => {
    // send the location & types array to Rob's api
    res.status(200).send(types);
});

module.exports = router;
