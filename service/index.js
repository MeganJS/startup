const express = require('express');
const app = express();
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

app.get('*', (_req, res) => {
  res.send({ msg: 'idea-thing service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});