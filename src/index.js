require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');

const app = express();


app.use(cors({
  origin: '*',               
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

connectDB();

app.use('/api/v1/bag', require('./routes/bag.routes'));
app.use('/api/v1/user', require('./routes/user.routes'));
app.use('/api/v1/vote', require('./routes/vote.routes'));

app.get('/', (req, res) => {
  res.send('Lays API v1 running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
