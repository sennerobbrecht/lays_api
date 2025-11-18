require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

connectDB();

const bagRoutes = require('./routes/bag.routes');
app.use('/api/v1/bag', bagRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/vote', require('./routes/vote.routes'));


app.get('/', (req, res) => {
  res.send('Lays API v1 running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
