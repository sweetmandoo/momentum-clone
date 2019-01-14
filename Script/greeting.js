const greetingContainer = document.querySelector(".js-greeting"); 
const form = greetingContainer.querySelector(".js-greeting-form");
const input = greetingContainer.querySelector("input");
const greeting = greetingContainer.querySelector(".js-greeting-label");

const USER_LS = "userName";
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    //페이지가 새로 고침 되는 현상을 막아주는 메서드
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    paintGreeting(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

 function init(){
    loadName();
 }

 init();