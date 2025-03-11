const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();
const config = require('./config');

const router = express.Router();
router.use(cors());

AWS.config.update(config.awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const CONTACT_TABLE = "ContactMessages"; 

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
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Could not save message" });
  }
});

module.exports = router;
