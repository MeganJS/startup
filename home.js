const usernameEl = document.querySelector("#profileName");
usernameEl.textContent = getUsername();
/*
what does "this" mean here?
*/
function getUsername(){
    return localStorage.getItem('userName') ?? '???';
}

class Friend {

    constructor (friendName){
        this.name = friendName;
    }

    getName(){
        return this.name;
    }
}

let friendList = [];
const friendStorage = localStorage.getItem('friendList');

if (friendStorage) {
    friendList = JSON.parse(friendStorage);
}
else {
    localStorage.setItem('friendList', JSON.stringify(friendList));
}

console.log(friendList.constructor);
/*FIXME: this will reset friendlist whenever page reopens I think so don't do that */

//this should make sure the page has the friendList correct when it opens
if (friendList.length !== 0){
    for (const friendVal of friendList){
        const newFriendItem = document.createElement('li');
        newFriendItem.innerHTML = '<button type="button" class="btn btn-info btn-sm m-1" aria-label="chat">converse</button><button type="button" class="btn btn-dark btn-sm m-1" aria-label="banish">banish</button>';
        newFriendItem.className = "list-group-item";
        newFriendItem.id = "friendListItem";
        const newFriend = document.createElement('div');
        newFriend.textContent = friendVal.name;
        newFriend.className = "friendName";
        newFriendItem.insertBefore(newFriend, newFriendItem.firstChild);
        const parentEl = document.querySelector('#friendList');
        parentEl.appendChild(newFriendItem);
    }
}



function addFriend(){
    var friendName = getInput();
    var isDuplicate = false;
    /*check for duplicates*/
    for (const friendVal of friendList) {
        if (friendVal.name === friendName){
            console.log("duplicate friend");
            isDuplicate = true;
            break;
        }
    }
    if (!isDuplicate){
        const newFriend = new Friend(friendName);
        friendList.push(newFriend);
        console.log("friend added");
        localStorage.setItem('friendList', JSON.stringify(friendList));
        updateFriendListAdd(newFriend);
    }
    else {
        /*FIXME add error message/alert popup */
    }
}

function removeFriend(removeName){
    var deleteIndex = 0;
    for (const friendVal of friendList){
        if (friendVal.name === removeName){
            deleteIndex = friendList.indexOf(friendVal);
            friendList.splice(deleteIndex, 1);
            console.log("friend removed");
            localStorage.setItem('friendList', JSON.stringify(friendList));
            updateFriendListRemove(removeName);
            break;
        }
    }
}
    /* we will deal with this later
    converseFriend(){
    }
    */
   /*This will need to actually make the html show the friend list */
function updateFriendListAdd(friendVal){
    const newFriendItem = document.createElement('li');
    newFriendItem.innerHTML = '<button type="button" class="btn btn-info btn-sm m-1" aria-label="chat">converse</button><button type="button" class="btn btn-dark btn-sm m-1" aria-label="banish">banish</button>';
    newFriendItem.className = "list-group-item";
    newFriendItem.id = "friendListItem";
    const newFriend = document.createElement('div');
    newFriend.textContent = friendVal.name;
    newFriend.className = "friendName";
    newFriendItem.insertBefore(newFriend, newFriendItem.firstChild);
    const parentEl = document.querySelector('#friendList');
    parentEl.appendChild(newFriendItem);
}
    
function updateFriendListRemove(removeName){

}



function getInput(){
    const friendNameEl = document.querySelector("#friendName");
    console.log(friendNameEl.value);
    return friendNameEl.value;
}

const requestFriendEl = document.querySelector("#request-button");
requestFriendEl.addEventListener('click', addFriend);
