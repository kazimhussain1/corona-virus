const express = require('express');
const app = express();
const port = 9000;
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.get('/api/world_data', (req, res) => {
  const world_data = fs.readFileSync('output.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(world_data);
});

app.set('json spaces', 40);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
