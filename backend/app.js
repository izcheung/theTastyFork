const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const reviewRoutes = require('./review'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join('thetastyfork', 'src')));

app.use('/submitReview', reviewRoutes);
app.use('/fetchReviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
