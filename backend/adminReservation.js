const { format } = require("date-fns");

const express = require("express");
const AWS = require("aws-sdk");
require("dotenv").config();
const config = require("./config");

const router = express.Router();
router.use(cors());

AWS.config.update(config.awsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();
const RESERVATION_TABLE = config.reservationTable;

// GET all reservations (admin view)
router.get("/", async (req, res) => {
  const params = { TableName: RESERVATION_TABLE };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json({
      status: "success",
      message: "Reservations retrieved successfully",
      data: data.Items,
    });
  } catch (error) {
    console.error("Admin fetch error:", error);
    res.status(500).json({ status: "error", message: "Could not fetch reservations" });
  }
});

// DELETE reservation by ID (admin cancel)
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
  
    // 1. Get the reservation first
    const getParams = {
      TableName: RESERVATION_TABLE,
      Key: { id },
    };
  
    try {
      const data = await dynamoDB.get(getParams).promise();
  
      if (!data.Item) {
        return res.status(404).json({ status: "error", message: "Reservation not found" });
      }
  
      const reservation = data.Item;
  
      // 2. Delete the reservation
      await dynamoDB.delete(getParams).promise();
  
      // 3. Send SMS to the user
      const cancelMessage = `The Tasty Fork: Hi ${reservation.name}, your reservation on ${reservation.dateTime} has been canceled by the restaurant.`;
  
      await sns
        .publish({
          Message: cancelMessage,
          PhoneNumber: reservation.phoneNumber,
        })
        .promise();
  
      res.status(200).json({
        status: "success",
        message: "Reservation canceled and customer notified",
      });
  
    } catch (error) {
      console.error("Admin delete error:", error);
      res.status(500).json({ status: "error", message: "Could not cancel reservation" });
    }
  });
  
