const express = require('express');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const multer = require('multer');
const upload = multer();
const config = require('./config');

const router = express.Router();

AWS.config.update(config.awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const REVIEW_TABLE = 'Reviews';
const S3_BUCKET_NAME = 'comp3962-milestone-review-bucket';

router.post('/submit', upload.single('photo'), async (req, res) => {
  try {
    const { reviewTitle, foodRating, serviceRating, overallExperience, name, email, reviewContent } = req.body;
    const photo = req.file;

    let photoUrl = '';
    
    if (photo) {
      const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: `reviews/${uuid.v4()}_${photo.originalname}`,
        Body: photo.buffer,
        ContentType: photo.mimetype,
      };

      const uploadResult = await s3.upload(uploadParams).promise();
      photoUrl = uploadResult.Location;
    }

    const reviewItem = {
      TableName: REVIEW_TABLE,
      Item: {
        reviewId: uuid.v4(),
        reviewTitle,
        reviewContent,
        foodRating,
        serviceRating,
        overallExperience,
        photoUrl,
        name,
        email,
        createdAt: new Date().toISOString(),
      },
    };

    await dynamoDB.put(reviewItem).promise();

    res.status(200).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Error submitting review' });
  }
});

router.get('/fetch', async (req, res) => {
  try {
    const params = {
      TableName: REVIEW_TABLE,
    };

    const data = await dynamoDB.scan(params).promise();
    console.log(data)
    res.status(200).json(data.Items);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

module.exports = router;
