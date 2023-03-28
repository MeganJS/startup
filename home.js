const usernameEl = document.querySelector("#profileName");
usernameEl.textContent = getUsername();
/*
what does "this" mean here?
*/

function getUsername(){
    return localStorage.getItem('userName') ?? '???';
}


class FriendList {
    friends;

    constructor(){
        this.friends = Array();
    }

    addFriend(){
        var friendName = getInput();
        /*var duplicate = false;*/
        if(this.friends === undefined){
            console.log(friendName);
            this.friends.push(friendName);
            localStorage.setItem('friendList', this.friends);
            this.updateFriendListAdd(friendName);
        }
        else if (this.friends.find(friendName) === undefined){
            console.log(friendName);
            this.friends.push(friendName);
            localStorage.setItem('friendList', this.friends);
            this.updateFriendListAdd(friendName);
        }
        /*
        for (const friendVal of this.friends){
            if (friendVal ===  friendName){ /*Do I need to use super here?*/
                /*FIXME: Insert error message here*//*
                duplicate = true;
                break;
            }
        }
        if (!duplicate){
            console.log(friendName);
            this.friends.push(friendName);
            localStorage.setItem('friendList', this.friends);
            this.updateFriendListAdd(friendName);
        }
        */
    }
    removeFriend(removeName){
        var deleteIndex = 0;
        for (const friendVal of this.friends){
            if (friendVal === removeName){
                deleteIndex = this.friends.indexOf(friendVal);
                this.friends.splice(deleteIndex, 1);
                localStorage.setItem('friendList', friends);
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
    updateFriendListAdd(friendName){
        const newFriend = document.createElement('div');
        newFriend.textContent = friendName;
        newFriend.className = "accordion-item";
        const accordionEl = document.querySelector('.accordion');
        accordionEl.appendChild(newFriend);
        
    }
    updateFriendListRemove(removeName){

    }
}


function getInput(){
    const friendNameEl = document.querySelector("#friendName");
    console.log(friendNameEl.value);
    return friendNameEl.value;
}

const listOfFriends = new FriendList();
const requestFriendEl = document.querySelector("#request-button");
requestFriendEl.addEventListener('click', listOfFriends.addFriend);
