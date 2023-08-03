const express = require('express');
const router = express.Router();

// Save user like pois to database
router.post('/save-action',  (req, res) => {
    // const location = req.body.location;
    location = 'barcelona_esp';
    res.send('Get location!');
});

module.exports = router;
