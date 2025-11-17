const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.send('Lays API v1 is running');
});

const bagRoutes = require('./routes/bag.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/v1/bag', bagRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}/api/v1`);
});
