const express = require('express');
const app = express();

app.use(express.json());

const bags = [
  {
    id: 1,
    name: 'Spicy Cheese Explosion',
    image: 'spicy-cheese.png',
    bagColor: '#ffcc00',
    font: 'Comic Sans',
    pattern: 'stripes',
    packaging: 'plastic',
    inspiration: 'movie night',
    keyFlavours: ['cheese', 'chili'],
    user: 'test-user@example.com'
  }
];

app.get('/api/v1', (req, res) => {
  res.send('Lays API v1 is running');
});

app.get('/api/v1/bag', (req, res) => {
  res.json(bags);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}/api/v1`);
});
