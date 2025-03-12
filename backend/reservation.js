const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();
const config = require('./config');

const router = express.Router();
router.use(cors());

AWS.config.update(config.awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();
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
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: "Reservation booked successfully!" });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ error: "Could not save reservation" });
  }
});

module.exports = router;
