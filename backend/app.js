const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const reviewRoutes = require('./review');
const contactRoutes = require("./contact");
const reservationRoutes = require("./reservation"); 
const adminReservationRoutes = require("./adminReservation");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join('thetastyfork', 'src')));

app.use('/submitReview', reviewRoutes);
app.use('/fetchReviews', reviewRoutes);
app.use('/admin/contact', contactRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin/reservations", adminReservationRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
