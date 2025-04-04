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

const REVIEW_TABLE = config.reviewTable;
const S3_BUCKET_NAME = config.s3Bucket;

router.post('/', upload.single('photo'), async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
  
    // 1. Get the reservation first
    const getParams = {
      TableName: REVIEW_TABLE,
      Key: { reviewId: id },
    };
  
    try {
      console.log(getParams);
      const data = await dynamoDB.get(getParams).promise();
      console.log("=========");
      console.log(data);
      if (!data.Item) {
        return res.status(404).json({ status: "error", message: "Review not found" });
      }

      // 2. Delete the reservation
      await dynamoDB.delete(getParams).promise();

      res.status(200).json({
        status: "success",
        message: "Review deleted",
      });
  
    } catch (error) {
      console.error("Admin delete error:", error);
      res.status(500).json({ status: "error", message: "Could not delete review" });
    }
  });

module.exports = router;
