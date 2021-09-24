const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEEN_CLASSNAME = "hidden";
const HIDDEEN_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(HIDDEEN_KEY, username);
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEEN_CLASSNAME);
    paintGreetings(savedUsername)
}

function paintGreetings(username){
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(HIDDEEN_KEY);
//git test
if (savedUsername === null) {
    // show the form
    loginForm.classList.remove(HIDDEEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    // show the greething
    paintGreetings(savedUsername);
}