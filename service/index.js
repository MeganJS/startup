const express = require('express');
const app = express();
//const uuid = require('uuid');
const bcrypt = require('bcrypt');
const DB = require('./database.js');
const cookieParser = require('cookie-parser');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const auth = "token";

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
//todo: look into cookie
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  let user = await DB.getUser(req.body.username);
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
    res.cookie(auth, user.token, {secure:true, httpOnly: true, SameSite: 'strict'});
    //res.send({ token: user.token });
    res.send({id: user._id});
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  let user = await DB.getUser(req.body.username);
  if (user) {
    let hashPass = await bcrypt.compare(req.body.password, user.password);
    if (hashPass) {
      res.cookie(auth, user.token, {secure:true, httpOnly: true, SameSite: 'strict'});
      res.send({id: user._id});

      //user.token = uuid.v4();
      //curUser=user;
      //res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(auth);
  /*
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
    curUser = {};
  }
  */
  res.status(204).end();
});

const secureRouter = express.Router();
apiRouter.use(secureRouter);

secureRouter.use(async (req, res, next) => {
  const authToken = req.cookies[auth];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({msg: 'Unauthorized' });
  }
});


// Getprojects note: req may need to be _req???
// how to check if user is logged in?
secureRouter.get('/projects', async (req, res) => {
  const authToken = req.cookies[auth];
  let user = await DB.getUserByToken(authToken);
  res.send(user.projects);
});

// Getfriends note: req may need to be _req???
secureRouter.get('/friends', async (req, res) => {
  const authToken = req.cookies[auth];
  let user = await DB.getUserByToken(authToken);
  //console.log(JSON.stringify(user.friends));
  //console.log(JSON.stringify(user));
  //let friends = await DB.getFriends(authToken);
  //console.log(friends);
  res.send(user.friends);
});


secureRouter.post('/projects', (req, res) => {
  const authToken = req.cookies[auth];
  DB.updateProjects(authToken, req.body);
  //const user = users[curUser.username];
  //const user = Object.values(users).find((u) => u.token === req.body.token);
  /*
  if (user){
    user.projects = req.body;
    curUser.projects = req.body; //tODO test this!!
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
  */
});

secureRouter.post('/friends', (req, res) => {
  const authToken = req.cookies[auth];
  DB.updateFriends(authToken, req.body);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});