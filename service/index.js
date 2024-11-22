const express = require('express');
const app = express();
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};
let curUser = {};

app.use(express.json());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
//todo: look into cookie
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.username];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { username: req.body.username, password: req.body.password, projects: req.body.projects, friends: req.body.friends, token: uuid.v4() };
    users[user.username] = user;
    curUser=user;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.username];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      curUser=user;
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
    curUser = {};
  }
  res.status(204).end();
});


// Getprojects note: req may need to be _req???
// how to check if user is logged in?
apiRouter.get('/projects', (_req, res) => {
  const user = users[curUser.username];
  //const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user){
    res.send(user.projects);
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Getfriends note: req may need to be _req???
apiRouter.get('/friends', (req, res) => {
  const user = users[curUser.username];
  //const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user){
    res.send(user.friends);
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


// SubmitScore
apiRouter.post('/projects', (req, res) => {
  const user = users[curUser.username];
  //const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user){
    user.projects = req.body;
    curUser.projects = req.body; //tODO test this!!
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// SubmitScore
apiRouter.post('/friends', (req, res) => {
  const user = users[curUser.username];
  //const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user){
    user.friends = req.body; //tODO test this!!
    curUser.friends = req.body;
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

/*
app.get('*', (_req, res) => {
  res.send({ msg: 'idea-thing service' });
});
*/

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});