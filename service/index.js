const express = require('express');
const app = express();
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

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  let user = await DB.getUser(req.body.username);
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
    res.cookie(auth, user.token, {secure:true, httpOnly: true, SameSite: 'strict',});
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
      res.cookie(auth, user.token, {secure:true, httpOnly: true, SameSite: 'strict',});
      res.send({id: user._id});
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(auth);
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

secureRouter.get('/friends/reqs', async (req, res) => {
  const authToken = req.cookies[auth];
  let user = await DB.getUserByToken(authToken);
  res.send(user.friendreqs);
});

secureRouter.get('/shared', async (req, res) => {
  const authToken = req.cookies[auth];
  let user = await DB.getUserByToken(authToken);
  res.send(user.sharedProjList);
});


secureRouter.post('/projects', async (req, res) => {
  console.log(1);
  const authToken = req.cookies[auth];
  await DB.updateProjects(authToken, req.body);
  const projs = await DB.getProjects(authToken);
  res.send(projs);
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

/*
secureRouter.post('/projects/title', async (req, res) => {
  const authToken = req.cookies[auth];
  await DB.updateProjectTitle(authToken, req.body.oldTitle, req.body.newTitle);
  const projects = await DB.getProjects(authToken);
  res.send(projects);
});
*/
/*
secureRouter.post('/friends', async (req, res) => {
  const authToken = req.cookies[auth];
  await DB.updateFriends(authToken, req.body);
  const friends = await DB.getFriends(authToken);
  res.send(friends);
});
*/
secureRouter.post('/friends/reqs', async (req, res) => {
  const authToken = req.cookies[auth];
  await DB.updateFriendReqs(authToken, req.body);
  const reqs = await DB.getFriendReqs(authToken);
  res.send(reqs);
});

secureRouter.post('/friends/reqs/send', async (req, res) => {
  console.log(0);
  let user = await DB.getUser(req.body.sendTo);
  console.log(1);
  if (user) {
    console.log("in");
    DB.addFriendReq(req.body.sendTo, req.body.fromUser);
    console.log(2);
    return;
  }
  console.log("out");
  res.status(409).send({ msg: 'user does not exist' });
});

secureRouter.delete('/friends', async (req, res) => {
  DB.removeFriend(req.body.discUser, req.body.userToRemove);
  let user = await DB.getUser(req.body.userToRemove);
  if (user) {
    DB.removeFriend(req.body.userToRemove, req.body.discUser);
  }
  else {
    res.status(409).send({ msg: 'user does not exist' });
  }
});

secureRouter.post('/friends', async (req, res) => {
  let user = await DB.getUser(req.body.userToAdd);
  if (user) {
    DB.addFriend(req.body.userToAdd, req.body.connUser);
    DB.addFriend(req.body.connUser, req.body.userToAdd);
    return;
  }
  res.status(409).send({ msg: 'user does not exist' });
});

secureRouter.post('/shared', async (req, res) => {
  let user = await DB.getUser(req.body.userToAdd);
  if (user) {
    DB.addSharedProject(req.body.userToAdd, req.body.shProject);
    return;
  }
  res.status(409).send({ msg: 'user does not exist' });
});

secureRouter.put('/shared', async (req, res) => {
  let user = await DB.getUser(req.body.userToUpdate);
  //console.log(req.body.userToUpdate);
  if (user) {
    //console.log('b');
    DB.updateSharedProject(req.body.userToUpdate, req.body.title, req.body.sharedby, req.body.shProject);
    //console.log('c');
    return;
  }
  res.status(409).send({ msg: 'user does not exist' });
});

secureRouter.delete('/shared', async (req, res) => {
  DB.removeFriend(req.body.discUser, req.body.userToRemove);
  let user = await DB.getUser(req.body.userToRemove);
  if (user) {
    DB.removeSharedProject(req.body.userToRemove, req.body.title, req.body.sharedby);
  }
  else {
    res.status(409).send({ msg: 'user does not exist' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});