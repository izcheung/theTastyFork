const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();
const config = require('./config');

const router = express.Router();
router.use(cors());

AWS.config.update(config.awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();
const RESERVATION_TABLE = config.reservationTable;

router.post("/", async (req, res) => {
  const { name, email, phoneNumber, tableSize, dateTime } = req.body;

  if (!name || !email || !phoneNumber || !tableSize || !dateTime) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const params = {
    TableName: RESERVATION_TABLE,
    Item: {
      id: new Date().getTime().toString(), 
      name,
      email,
      phoneNumber,
      tableSize,
      dateTime,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    // Save reservation in DynamoDB
    await dynamoDB.put(params).promise();

    // SNS Message Content
    const message = `Hello ${name}, your reservation for ${tableSize} people on ${dateTime} has been confirmed. Thank you!`;
    
    // Send SNS Notification
    const snsParams = {
      Message: message,
      PhoneNumber: phoneNumber, // Replace with valid phone number format
    };

    await sns.publish(snsParams).promise();

    res.status(201).json({ message: "Reservation booked successfully & notification sent!" });
  } catch (error) {
    console.error("Error saving reservation or sending SNS:", error);
    res.status(500).json({ error: "Could not save reservation or send notification" });
  }
});

router.get("/", async (req, res) => {
  const params = {
    TableName: RESERVATION_TABLE,
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Could not fetch reservations" });
  }
});

module.exports = router;
