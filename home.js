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
        newFriendItem.setAttribute("name", friendVal.name);

        //newFriendItem.innerHTML = '<button type="button" class="btn btn-info btn-sm m-1" aria-label="chat">converse</button><button type="button" class="btn btn-dark btn-sm m-1" aria-label="banish">banish</button>';
        newFriendItem.className = "list-group-item";
        newFriendItem.id = "friendListItem";
        const newFriend = document.createElement('div');
        newFriend.textContent = friendVal.name;
        newFriend.className = "friendName";
        newFriendItem.appendChild(newFriend);
        //converse button
        const converseButton = document.createElement('button');
        converseButton.type = "button";
        converseButton.className = "btn btn-info btn-sm m-1";
        converseButton.setAttribute("aria-label", "converse");
        converseButton.textContent = "converse";
        newFriendItem.appendChild(converseButton);
        //deleteButton
        const deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.className = "btn btn-dark btn-sm m-1";
        deleteButton.setAttribute("aria-label", "banish");
        deleteButton.setAttribute('id', 'delete-button');
        deleteButton.textContent = "banish";
        deleteButton.addEventListener('click', () => {removeFriend(friendVal.name)});
        newFriendItem.appendChild(deleteButton);

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
    console.log(removeName);
    if (window.confirm("Banish friend?")){
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
}
    /* we will deal with this later
    converseFriend(){
    }
    */
   /*This will need to actually make the html show the friend list */
function updateFriendListAdd(friendVal){
    const newFriendItem = document.createElement('li');
    newFriendItem.setAttribute("name", friendVal.name);

    //newFriendItem.innerHTML = '<button type="button" class="btn btn-info btn-sm m-1" aria-label="chat">converse</button><button type="button" class="btn btn-dark btn-sm m-1" aria-label="banish">banish</button>';
    newFriendItem.className = "list-group-item";
    newFriendItem.id = "friendListItem";
    const newFriend = document.createElement('div');
    newFriend.textContent = friendVal.name;
    newFriend.className = "friendName";
    newFriendItem.appendChild(newFriend);
    //converse button
    const converseButton = document.createElement('button');
    converseButton.type = "button";
    converseButton.className = "btn btn-info btn-sm m-1";
    converseButton.setAttribute("aria-label", "converse");
    converseButton.textContent = "converse";
    newFriendItem.appendChild(converseButton);
    //deleteButton
    const deleteButton = document.createElement('button');
    deleteButton.type = "button";
    deleteButton.className = "btn btn-dark btn-sm m-1";
    deleteButton.setAttribute("aria-label", "banish");
    deleteButton.setAttribute('id', 'delete-button');
    deleteButton.textContent = "banish";
    deleteButton.addEventListener('click', () => {removeFriend(friendVal.name)});
    newFriendItem.appendChild(deleteButton);

    const parentEl = document.querySelector('#friendList');
    parentEl.appendChild(newFriendItem);
}
    
function updateFriendListRemove(removeName){
    const elToDelete = document.querySelector(`li[name='${removeName}']`);
    while(elToDelete.firstChild){
        elToDelete.removeChild(elToDelete.firstChild);
    }
    elToDelete.parentElement.removeChild(elToDelete);
}



function getInput(){
    const friendNameEl = document.querySelector("#friendName");
    console.log(friendNameEl.value);
    return friendNameEl.value;
}

const requestFriendEl = document.querySelector("#request-button");
requestFriendEl.addEventListener('click', addFriend);





