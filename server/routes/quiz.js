const express = require('express');
const router = express.Router();
const axios = require('axios');

// Array to store user selected location
let location = [];
// Array to store user selected types
let types = [];
// Location examples
// const recommendations = [
//     { id: 1, name: 'Location1' },
//     { id: 2, body: 'Location2' },
//     { id: 3, name: 'Location3' },
//     { id: 4, name: 'Location4' },
//     { id: 5, name: 'Location5' }
// ];

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

// Get first recommendation from API call
router.get('/type-action', async (req, res) => {
    const apiKey = '5ae2e3f221c38a28845f05b69faad9345b8deb30267f8430eabc0069';
    const location_query = location[0];
    const types_query = types;
    try {
        // Make the API call to OpenTripMap
        const response = await axios.get(`http://api.opentripmap.com/0.1/en/places/bbox?lon_min=2.1164359207060954&lat_min=41.3576824375304&lon_max=2.2404671435130012&lat_max=41.42204319076333&kinds=churches&limit=5&format=geojson&apikey=${apiKey}`);
        // const response = await axios.get(`http://api.opentripmap.com/0.1/en/places/geoname?name=${location_query}&apikey=${apiKey}`);
        const data = response.data;
        // Process the data or send it back to the client
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
