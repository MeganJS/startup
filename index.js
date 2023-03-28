function login() {
    const nameEl = document.querySelector("#floatingName");
    const passwordEl = document.querySelector("#floatingPassword");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", passwordEl.value);
    window.location.href = "home.html";
}

function signup() {
    document.querySelector("#loginCenter").style.display = 'none';
    document.querySelector("#signupCenter").style.display = 'block';
}

function back() {
    document.querySelector("#loginCenter").style.display = 'block';
    document.querySelector("#signupCenter").style.display = 'none';
}