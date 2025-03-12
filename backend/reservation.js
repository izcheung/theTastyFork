const { format } = require("date-fns");

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

// Function to validate phone number format
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber.startsWith("+")) {
    console.error("Invalid phone number format. Must start with + and country code.");
    return null; // Invalid format
  }
  return phoneNumber;
};

router.post("/", async (req, res) => {
  const { name, email, phoneNumber, tableSize, dateTime } = req.body;

  // Convert dateTime to human-readable format
  const formattedDate = format(new Date(dateTime), "MMMM do, yyyy 'at' h:mm a");

  if (!name || !email || !phoneNumber || !tableSize || !dateTime) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate and format phone number
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  if (!formattedPhoneNumber) {
    return res.status(400).json({ error: "Invalid phone number format. Use +1234567890 format." });
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
    const message = `The Tasty Fork: Hi ${name}, your reservation for ${tableSize} people on ${formattedDate} has been confirmed. Thank you!`;
    
    // Send SNS Notification
    const snsParams = {
      Message: message,
      PhoneNumber: phoneNumber, 
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
