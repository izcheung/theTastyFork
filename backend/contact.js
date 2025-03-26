const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();
const config = require('./config');

const router = express.Router();
router.use(cors());

AWS.config.update(config.awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const CONTACT_TABLE = config.contactTable;
const sns = new AWS.SNS();
const CONTACT_TOPIC_ARN = config.snsTopicArn;

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const params = {
    TableName: CONTACT_TABLE,
    Item: {
      id: new Date().getTime().toString(), 
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();

    // 2. Publish email notification via SNS
    const snsParams = {
      Message: `New Contact Submission\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      Subject: `New Contact Form Submission from ${name}`,
      TopicArn: CONTACT_TOPIC_ARN,
    };

    await sns.publish(snsParams).promise();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Could not save message" });
  }
});

router.get('/', async (req, res) => {
  try {
    const params = {
      TableName: CONTACT_TABLE,
    };

    const data = await dynamoDB.scan(params).promise();
    console.log(data)
    res.status(200).json(data.Items);
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).json({ message: 'Error fetching contact data' });
  }
});

module.exports = router;
