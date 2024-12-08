const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('idea-thing');
const userColl = db.collection('user');

(async function testConn() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("connected to database");
})().catch((ex)=>{
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(username) {
    return userColl.findOne({ username: username });
}

function getUserByToken(token) {
    return userColl.findOne({token: token});
}

async function createUser(username, password) {
    const passHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passHash,
        token: uuid.v4(),
        projects: [],
        friends: [],
        friendreqs: [],
        sharedProjList: []
    };
    await userColl.insertOne(user);
    return user;
}

function getProjects(token) {
    const user = userColl.findOne({token: token});
    return user.projects;
}

function getFriends(token) {
    const user = userColl.findOne({token: token});
    return user.friends;
}

function getFriendReqs(token) {
    const user = userColl.findOne({token: token});
    return user.friendreqs;
}

function getShared(token) {
    const user = userColl.findOne({token: token});
    return user.shared;
}

async function updateProjects(token, projectList) {
    /*
    const user = userColl.findOne({token: token});
    user.projects = projectList;
    userColl.updateOne();
    */
    userColl.findOneAndUpdate({token: token}, {$set:{projects: projectList}});
}

async function updateProjectTitle(token, oldTitle, newTitle) {
    const user = userColl.findOne({token: token});
    //user.projects.updateOne({title: oldTitle}, {$set:{title:newTitle}});
}

async function updateFriends(token, frList) {
    userColl.findOneAndUpdate({token: token}, {$set:{friends: frList}});
}


async function updateFriendReqs(token, frList) {
    userColl.findOneAndUpdate({token: token}, {$set:{friendreqs: frList}});
}

async function addFriend(username, friend) {
    const user = userColl.findOne({username: username});
    userColl.findOneAndUpdate({username: username}, {$addToSet: {friends : friend}},{upsert: true})
    .then(result => {
        console.log("update success", result);
    })
    .catch(err=>{
        console.error('error:', err);
    });
    //return user.friends;
}

async function removeFriend(username, friend) {
    const user = userColl.findOne({username: username});
    userColl.findOneAndUpdate({username: username}, {$pull: {friends : friend}},{upsert:true})
    .then(result => {
        console.log("update success", result);
    })
    .catch(err=>{
        console.error('error:', err);
    });
    //return user.friends;
}

async function addFriendReq(username, friend) {
    //const user = userColl.findOne({username: username});
    userColl.findOneAndUpdate({username: username}, {$push: {friendreqs : friend}},{upsert:true})
    .then(result => {
        console.log("update success", result);
    })
    .catch(err=>{
        console.error('error:', err);
    });
    //return user.friends;
}

async function addSharedProject(username, shProject) {
    userColl.findOneAndUpdate({username: username}, {$push: {sharedProjList : shProject}},{upsert:true})
    .then(result => {
        console.log("update success", result);
    })
    .catch(err=>{
        console.error('error:', err);
    });
}

async function removeSharedProject(username, title, sharedby) {
    userColl.findOneAndUpdate(
        {username: username}, 
        {$pull: {sharedProjList : { title: title, sharedby: sharedby }}},
        {upsert:true}
    )
    .then(result => {
        console.log("update success", result);
    })
    .catch(err=>{
        console.error('error:', err);
    });
}

async function updateSharedProject(username, title, sharedby, shProject) {
    console.log(title,sharedby);
    userColl.findOneAndUpdate(
        {username: username, sharedProjList: { $elemMatch: { title: title, sharedby: sharedby }}},
        {$set: {'sharedProjList.$': shProject}},
        //{upsert:true, returnDocument: 'after'})
        {upsert:true})
    .then(result => {
        console.log("update success", result);
    })
    .catch(err=>{
        console.error('error:', err);
    });
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getProjects,
    getFriends,
    getFriendReqs,
    updateProjects,
    updateFriends,
    updateFriendReqs,
    addFriendReq,
    removeFriend,
    addFriend,
    addSharedProject,
    removeSharedProject,
    updateSharedProject
};
