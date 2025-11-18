require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use('/api/v1/bag', require('./routes/bag.routes'));

app.get('/', (req, res) => {
  res.send('Lays API v1 running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
