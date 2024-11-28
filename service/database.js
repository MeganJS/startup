const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('idea-thing');
const userColl = db.collection('user');

(async function testConn() {
    await client.connect();
    await db.command({ ping: 1 });
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
        friends: []
    };
    await userColl.insertOne(user);

    return user;
}

module.exports = {
    getUser,
    getUserByToken,
    createUser
};
