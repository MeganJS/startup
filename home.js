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

const friendList = [];
localStorage.setItem('friendList', friendList);
/*FIXME: this will reset friendlist whenever page reopens I think so don't do that */

function addFriend(){
    var friendName = getInput();
    var isDuplicate = false;
    /*check for duplicates*/
    for (const friendVal of friendList) {
        if (friendVal.getName() === friendName){
            console.log("duplicate friend");
            isDuplicate = true;
            break;
        }
    }
    if (!isDuplicate){
        const newFriend = new Friend(friendName);
        friendList.push(newFriend);
        console.log("friend added");
        localStorage.setItem('friendList', friendList);
        updateFriendListAdd(newFriend);
    }
    else {
        /*FIXME add error message/alert popup */
    }
}

function removeFriend(removeName){
    var deleteIndex = 0;
    for (const friendVal of friendList){
        if (friendVal.getName() === removeName){
            deleteIndex = friendList.indexOf(friendVal);
            this.friends.splice(deleteIndex, 1);
            console.log("friend removed");
            localStorage.setItem('friendList', friendList);
            this.updateFriendListRemove(removeName);
            break;
        }
    }
}
    /* we will deal with this later
    converseFriend(){
    }
    */
   /*This will need to actually make the html show the friend list */
function updateFriendListAdd(friendName){
    const newFriendItem = document.createElement('li');
    newFriendItem.innerHTML = '<div class="btn-group-sm bg-transparent" role="group" id="friendControls"><button type="button" class="btn btn-info" aria-label="chat">converse</button><button type="button" class="btn btn-dark" aria-label="vanish">vanish</button></div>';
    newFriendItem.className = "list-group-item";
    const newFriend = document.createElement('div');
    newFriend.textContent = friendName.getName();
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
