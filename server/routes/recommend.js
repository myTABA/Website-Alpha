const apiKey = 'kjsdhf873thajgdgjs73gebsy8va2pft';
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();


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
// Save user like pois to database
router.post('/save-liked-disliked', (req, res) => {
    const data = req.body;

    let session_id = 'jsurn48fk2h8p0s1';
    let poi_id = 'd5292691ef52210d';
    const apiUrl = `https://tub4rlcl4miawtamb5uglpyv2e0xissr.lambda-url.us-east-2.on.aws/traveler/liked-disliked/${poi_id}?session_id=${session_id}&like=1&api-key=${apiKey}`;
    axios.put(apiUrl)
    .then(response => {
        console.log('Response:', response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.error('Error making PUT request:', error);
    });
});

// Show user like pois
router.get('/get-liked-disliked', async (req, res) => {
    const request = req.body;
    let traveler_id = '811a6495a7a21503';
    try {
        const response = await axios.get(`https://tub4rlcl4miawtamb5uglpyv2e0xissr.lambda-url.us-east-2.on.aws/traveler/get-poiids/${traveler_id}?session_id=all&score=all&like=all&api-key=${apiKey}`);
        const data = response.data;
        const jsonData = [];
        let elements = data.poi_ids;
        const promises = elements.map(async(element) => {
            // TODO : Hard code poiid 
            poiId = 'bd89850b37dd8262';
            // poiId = element.poi_id;
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
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
