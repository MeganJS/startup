const usernameEl = document.querySelector("#profileName");
usernameEl.textContent = getUsername();
/*
what does "this" mean here?
*/

function getUsername(){
    return localStorage.getItem('userName') ?? '???';
}