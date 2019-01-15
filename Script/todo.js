const todo = document.querySelector(".js-todo");
const todoForm = todo.querySelector(".js-todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = todo.querySelector(".js-todo-list");

const TODOS_LS = "toDos";

let toDos = [];


function deleteToDo(event){
    console.log(event.target.parentNode);

    const selectItem = event.target.parentNode;
    todoList.removeChild(selectItem);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id != parseInt(selectItem.id);
    });

    toDos = cleanToDos;
    saveToDos();
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    console.log(text);

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    todoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);

    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        console.log(loadedToDos);

        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init () {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();