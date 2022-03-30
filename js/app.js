window.addEventListener('DOMContentLoaded', getTodos)

const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_btn');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter-todo')

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

function addTodo(e) {
    e.preventDefault()

    const todoDiv = `<div class="todo">
                <li class="todo_item">${todoInput.value}</li>
                <button class="complete_btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="405.272px" height="405.272px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;width: 15px;height: 15px;" xml:space="preserve"><g><path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836   c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064   c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/></g></svg></button>
                <button class="trashButton_btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;width: 15px;height: 15px;" xml:space="preserve"><g><path d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289   C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h46c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M20.553,6   c0.112-1.048,0.435-2.496,1.24-3.319C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681   c0.805,0.823,1.128,2.271,1.24,3.319H20.553z"/><path d="M10.456,54.021C10.493,55.743,11.565,59,15.364,59h28.272c3.799,0,4.871-3.257,4.907-4.958L50.376,10H8.624L10.456,54.021z    M17.5,42h24c0.552,0,1,0.447,1,1s-0.448,1-1,1h-24c-0.552,0-1-0.447-1-1S16.948,42,17.5,42z M17.5,47h24c0.552,0,1,0.447,1,1   s-0.448,1-1,1h-24c-0.552,0-1-0.447-1-1S16.948,47,17.5,47z M17.5,52h24c0.552,0,1,0.447,1,1s-0.448,1-1,1h-24   c-0.552,0-1-0.447-1-1S16.948,52,17.5,52z"/></g></svg></button>
            </div>`

    // save to localStorage
    saveLocalTodos(todoInput.value)

    todoList.insertAdjacentHTML('beforeend', todoDiv)

    todoInput.value = ''
}

function deleteCheck(e) {
    e.preventDefault()
    const item = e.target

    if (item.classList[0] === 'trashButton_btn') {
        const todo = item.parentElement;
        todo.classList.add('fall')

        removeLocalTodos(todo)

        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
        // todo.remove()
    }

    if (item.classList[0] === 'complete_btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;

            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

let todos;

function checkLocalTodos() {
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
}

function saveLocalTodos(todo) {
    checkLocalTodos()

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    checkLocalTodos()

    todos.forEach(todo => {

        const todoDiv = `<div class="todo">
                    <li class="todo_item">${todo}</li>
                    <button class="complete_btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="405.272px" height="405.272px" viewBox="0 0 405.272 405.272" style="enable-background:new 0 0 405.272 405.272;width: 15px;height: 15px;" xml:space="preserve"><g><path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836   c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064   c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/></g></svg></button>
                    <button class="trashButton_btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;width: 15px;height: 15px;" xml:space="preserve"><g><path d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289   C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h46c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M20.553,6   c0.112-1.048,0.435-2.496,1.24-3.319C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681   c0.805,0.823,1.128,2.271,1.24,3.319H20.553z"/><path d="M10.456,54.021C10.493,55.743,11.565,59,15.364,59h28.272c3.799,0,4.871-3.257,4.907-4.958L50.376,10H8.624L10.456,54.021z    M17.5,42h24c0.552,0,1,0.447,1,1s-0.448,1-1,1h-24c-0.552,0-1-0.447-1-1S16.948,42,17.5,42z M17.5,47h24c0.552,0,1,0.447,1,1   s-0.448,1-1,1h-24c-0.552,0-1-0.447-1-1S16.948,47,17.5,47z M17.5,52h24c0.552,0,1,0.447,1,1s-0.448,1-1,1h-24   c-0.552,0-1-0.447-1-1S16.948,52,17.5,52z"/></g></svg></button>
                </div>`

        todoList.insertAdjacentHTML('beforeend', todoDiv)
    })
}

function removeLocalTodos(todo) {
    checkLocalTodos()

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}