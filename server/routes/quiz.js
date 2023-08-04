const apiKey = 'kjsdhf873thajgdgjs73gebsy8va2pft';
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

let sessionId = 0;
let location;

// Connect to s3
const s3Client = new S3Client({
    region: 'us-east-2', // Replace with your desired AWS region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
async function generateSignedUrl (bucketName, objectKey) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey
    });
    try {
        const signedUrl = await getSignedUrl(s3Client, command);
        return signedUrl;
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return null;
    }
}

// Route for handling location_button
router.post('/location-action',  (req, res) => {
    // const location = req.body.location;
    location = 'barcelona_esp';
    res.send('Get location!');
});


// Route for handling location_button
router.get('/location-action', async (req, res) => {
    try {
        location = 'barcelona_esp';
        const response = await axios.get(`https://mji2plpsylpc3uqdfwfb2cwtvq0mzbna.lambda-url.us-east-1.on.aws/profiler/get-cluster/${location}?api-key=${apiKey}`);
        // const response = await axios.get(`https://xwim6jhv6d3rhgdpudpl3gusky0oycqp.lambda-url.us-east-2.on.aws/profiler/get-cluster/${location}?api-key=${apiKey}`);
        const data = response.data;
        let clusters = data.cluster;
        const promises = clusters.map((cluster) => {
            let bucketName;
            let objectKey;
            imageURL = cluster.img;
            if (imageURL !== undefined) {
                const parts = imageURL.split('/');
                bucketName = parts[2]; // The bucket is the third element after splitting
                objectKey = parts.slice(3).join('/');
            } else {
                // TODO: Hard code no S3 link photo
                bucketName = 'mytaba-trip-types';
                objectKey = 'trip-type-adventurous.svg';
            }
            
            return generateSignedUrl(bucketName, objectKey)
                .then((presignedURL) => {
                if (presignedURL) {
                    // console.log('Presigned URL:', presignedURL);
                    cluster.imagesURL = presignedURL;
                }
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        });
        // Wait for all promises to resolve before sending the response
        Promise.all(promises)
        .then(() => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
// Route for handling types_button
router.post('/type-action', (req, res) => {
    const apiUrl = `https://xwim6jhv6d3rhgdpudpl3gusky0oycqp.lambda-url.us-east-2.on.aws/profiler/initiate-session?api-key=${apiKey}`;
    const data = req.body;
    axios.post(apiUrl, data)
        .then(response => {
            console.log('Response:', response.data.session_id);
            sessionId = response.data.session_id;
            res.send('Generate session id!');
        })
        .catch(error => {
            console.error('Error making POST request:', error);
        });
});

// Get first recommendation from API call
router.get('/type-action', async (req, res) => {
    // TODO : hard code session ID
    // sessionId = 'jsurn48fk2h8p0s1';
    let poiId = 0;
    try {
        const response = await axios.get(`https://3aphhcfwtbfk5wdqewyxbyakje0hpkfw.lambda-url.us-east-2.on.aws/recommender/session/${sessionId}?country=esp&city=barcelona&limit=1&topp=0.8&topk=200&temp=0.2&api-key=${apiKey}`);
        data = response.data;
        poiId = data.pois[0].poi_id;
        // Call get poi detail
        
        const responseDetail = await axios.get(`https://bvln6ak7ovklghu2suidzwjrq40jhdju.lambda-url.us-east-2.on.aws/poidetails/get-poi-details/${poiId}?infolimit=name&infolimit=city&infolimit=country&infolimit=descrh&infolimit=descrc&infolimit=latlong&infolimit=ids&infolimit=images&api-key=${apiKey}`);
        detail = responseDetail.data;
        imageURL = detail.pois[0].images;
        let bucketName;
        let objectKey;
        if (imageURL !== 'nan') {
            const parts = imageURL.split('/');
            bucketName = parts[2]; // The bucket is the third element after splitting
            objectKey = parts.slice(3).join('/');
        } else {
            // TODO : Hard code no S3 link photo
            bucketName = 'mytaba-imgs';
            objectKey = 'esp/barcelona/b25dcbf5609eb65a/f63f4d22278261cdca071c6b2daa5ab9.jpg';
        }
        generateSignedUrl(bucketName, objectKey)
        .then((presignedURL) => {
            if (presignedURL) {
                // console.log('Presigned URL:', presignedURL);
                detail.pois[0].imagesURL = presignedURL;
                res.json(detail);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Route for handle interest_level button
router.post('/interest-level-action/:id', (req, res) => {
    const data = req.body;
    data.session_id = sessionId;
    if (req.params.id >= '1' && req.params.id <= '5') {
        const apiUrl = `https://xwim6jhv6d3rhgdpudpl3gusky0oycqp.lambda-url.us-east-2.on.aws/profiler/update-session?api-key=${apiKey}`;
        axios.put(apiUrl, data)
        .then(response => {
            console.log('Response:', response.data);
            res.send('Update session id!');
        })
        .catch(error => {
            console.error('Error making PUT request:', error);
        });
    } else {
        res.status(400).send('Invalid button ID');
    }
});

// Route for getting update POI according to interest level
router.get('/interest-level-action/:id', async (req, res) => {
    sessionId = 'jsurn48fk2h8p0s1';
    let poiId = 0;
    if (req.params.id >= '1' && req.params.id <= '4') {
        try {
            const response = await axios.get(`https://3aphhcfwtbfk5wdqewyxbyakje0hpkfw.lambda-url.us-east-2.on.aws/recommender/session/${sessionId}?country=esp&city=barcelona&limit=1&topp=0.8&topk=200&temp=0.2&api-key=${apiKey}`);
            data = response.data;
            poiId = data.pois[0].poi_id;
            // Call get poi detail
            // console.log(poiId);
            const responseDetail = await axios.get(`https://bvln6ak7ovklghu2suidzwjrq40jhdju.lambda-url.us-east-2.on.aws/poidetails/get-poi-details/${poiId}?infolimit=name&infolimit=city&infolimit=country&infolimit=descrh&infolimit=descrc&infolimit=latlong&infolimit=ids&infolimit=images&api-key=${apiKey}`);
            detail = responseDetail.data;
            imageURL = detail.pois[0].images;
            let bucketName;
            let objectKey;
            if (imageURL !== 'nan') {
                const parts = imageURL.split('/');
                bucketName = parts[2]; // The bucket is the third element after splitting
                objectKey = parts.slice(3).join('/');
            } else {
                // TODO : Hard code no S3 link photo
                bucketName = 'mytaba-imgs';
                objectKey = 'esp/barcelona/b25dcbf5609eb65a/f63f4d22278261cdca071c6b2daa5ab9.jpg';
            }
            generateSignedUrl(bucketName, objectKey)
            .then((presignedURL) => {
                if (presignedURL) {
                    // console.log('Presigned URL:', presignedURL);
                    detail.pois[0].imagesURL = presignedURL;
                    res.json(detail);
                }
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    } else if (req.params.id === '5') {
        try {
            const response = await axios.get(`https://3aphhcfwtbfk5wdqewyxbyakje0hpkfw.lambda-url.us-east-2.on.aws/recommender/session/${sessionId}?country=esp&city=barcelona&limit=10&topp=0.8&topk=200&temp=0.2&api-key=${apiKey}`);
            data = response.data;
            // Call get poi detail
            const jsonData = [];
            let elements = data.pois;
            const promises = elements.map(async(element) => {
                poiId = element.poi_id;
                const responseDetail = await axios.get(`https://bvln6ak7ovklghu2suidzwjrq40jhdju.lambda-url.us-east-2.on.aws/poidetails/get-poi-details/${poiId}?infolimit=name&infolimit=city&infolimit=country&infolimit=descrh&infolimit=descrc&infolimit=latlong&infolimit=ids&infolimit=images&api-key=${apiKey}`);
                element.poiDetail = responseDetail.data.pois[0];
                imageURL = element.poiDetail.images;
                let bucketName;
                let objectKey;
                if (imageURL !== 'nan') {
                    const parts = imageURL.split('/');
                    bucketName = parts[2]; // The bucket is the third element after splitting
                    objectKey = parts.slice(3).join('/');
                } else {
                    // TODO : Hard code no S3 link photo
                    bucketName = 'mytaba-imgs';
                    objectKey = 'esp/barcelona/b25dcbf5609eb65a/f63f4d22278261cdca071c6b2daa5ab9.jpg';
                }
                
                return generateSignedUrl(bucketName, objectKey)
                    .then((presignedURL) => {
                        if (presignedURL) {
                            // console.log('Presigned URL:', presignedURL);
                            element.poiDetail.imagesURL = presignedURL;
                            jsonData.push(element);
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error: error.message });
                    });
            });
            // Wait for all promises to resolve before sending the response
            Promise.all(promises)
            .then(() => {
                res.json(jsonData);
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    } else {
        res.status(400).send('Invalid button ID');
    }
});

module.exports = router;
