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

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// Route for handling location_button action
router.post('/location-action', (req, res) => {
    // res.status(200).send(req.body.card);
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

// Serve the React app on the root URL
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });


module.exports = router;
