const { format } = require("date-fns");

const express = require("express");
const AWS = require("aws-sdk");
require("dotenv").config();
const config = require("./config");

const router = express.Router();
router.use(cors());

AWS.config.update(config.awsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient();
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

  const params = {
    TableName: RESERVATION_TABLE,
    Key: { id },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({ status: "success", message: "Reservation canceled" });
  } catch (error) {
    console.error("Admin delete error:", error);
    res.status(500).json({ status: "error", message: "Could not cancel reservation" });
  }
});

module.exports = router;
