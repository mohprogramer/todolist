const input = document.querySelector(".todo-input");
const ul = document.querySelector(".todo-list");
document.querySelector(".todo-button").addEventListener("click", addToDo);
document.querySelector(".todo-list").addEventListener("click", deleteCompelet)
document.addEventListener("DOMContentLoaded", getAll)
document.querySelector(".filter-todo").addEventListener("click", filterTodo)

function addToDo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerText = input.value;
    localStorageSave(input.value);
    input.value = "";
    todoDiv.appendChild(li)

    const trashbutton = document.createElement("button");
    trashbutton.classList.add("trash-btn");
    trashbutton.innerHTML = "<i class='fas fa-trash'><i>"
    todoDiv.appendChild(trashbutton);


    const completedbutton = document.createElement("button");
    completedbutton.classList.add("complete-btn");
    completedbutton.innerHTML = "<i class='fas fa-check'><i>"
    todoDiv.appendChild(completedbutton);

    ul.appendChild(todoDiv);
};

function deleteCompelet(event) {
    if (event.target.classList[0] === "complete-btn") {
        event.target.parentElement.classList.toggle("completed");
    };
    if (event.target.classList[0] === "trash-btn") {
        event.target.parentElement.remove();
        localStorageRemove(event.target.parentElement.children[0].innerText);

    };
};


function todoExist() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
};

function localStorageSave(todo) {
    const todoArray = todoExist();
    todoArray.push(todo);
    localStorage.setItem("todos", JSON.stringify(todoArray));
}


function localStorageRemove(todo) {
    const todoArray = todoExist();
    todoArray.splice(todoArray.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todoArray));
}


function getAll() {
    const todoArray = todoExist();
    todoArray.forEach(item => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerText = item;
        todoDiv.appendChild(li)

        const trashbutton = document.createElement("button");
        trashbutton.classList.add("trash-btn");
        trashbutton.innerHTML = "<i class='fas fa-trash'><i>"
        todoDiv.appendChild(trashbutton);


        const completedbutton = document.createElement("button");
        completedbutton.classList.add("complete-btn");
        completedbutton.innerHTML = "<i class='fas fa-check'><i>"
        todoDiv.appendChild(completedbutton);

        ul.appendChild(todoDiv);
    })
}



function filterTodo(event) {
    const todos = ul.children;
    todos.forEach(item => {
        switch (event.target.value) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if (item.classList.contains("completed")) {
                    item.style.display = "none"
                } else {
                    item.style.display = "flex";
                }
                break;
            case "uncompleted":
                if (item.classList.contains("completed")) {
                    item.style.display = "flex"
                } else {
                    item.style.display = "none";
                }
                break;
        }

    })

}