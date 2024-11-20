const express = require('express');
const app = express();
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};


app.use(express.json());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, projects: req.body.projects, friends: req.body.friends, token: uuid.v4() };
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

app.get('*', (_req, res) => {
  res.send({ msg: 'idea-thing service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});