const express = require('express');
const app = express();

app.use(express.json());

function requireAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Auth token required' });
  }

  next();
}
//test of het werkt.
app.get('/api/v1', (req, res) => {
  res.send('Lays API v1 is running');
});

//get   api/v1/bag
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

app.get('/api/v1/bag', (req, res) => {
  res.json(bags);
});

//post api/v1/bag
app.post('/api/v1/bag', requireAuth, (req, res) => {
  const {
    name,
    image,
    bagColor,
    font,
    pattern,
    packaging,
    inspiration,
    keyFlavours,
    user
  } = req.body;

 
  if (!name || !image || !bagColor || !font || !pattern || !packaging || !inspiration || !keyFlavours || !user) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBag = {
    id: bags.length + 1,
    name,
    image,
    bagColor,
    font,
    pattern,
    packaging,
    inspiration,
    keyFlavours,
    user
  };

  bags.push(newBag);

  res.status(201).json(newBag);
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}/api/v1`);
});
