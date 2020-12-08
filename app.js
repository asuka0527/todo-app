class Todo {
  id = (Date.now() + "").slice(-10);

  constructor(inputTodo) {
    this.inputTodo = inputTodo;
  }
}

const input = document.querySelector(".input");
const btnAdd = document.querySelector(".btn--add");
const todoList = document.querySelector(".todo__list");
const deleteTodo = document.querySelector(".delete");
const todoItem = document.querySelector(".todo__item");

class App {
  #todos = [];
  newTodo;
  constructor() {
    btnAdd.addEventListener("click", this.addTodoClick);
    input.addEventListener("keydown", this.addTodo);
    todoList.addEventListener("click", this.markTodo);
    todoList.addEventListener("click", this.deleteTodo);

    this.init();
    console.log(this.#todos);
  }

  addTodo = (e) => {
    if (e.key === "Enter") {
      const todo = input.value;
      let newTodo;
      newTodo = new Todo(todo);
      console.log(newTodo);
      this.#todos.push(newTodo);

      this.renderTodo(newTodo);
      this.persistTodos();
      input.value = "";
    }
  };

  addTodoClick = () => {
    const todo = input.value;
    let newTodo;
    newTodo = new Todo(todo);
    console.log(newTodo);
    this.#todos.push(newTodo);

    this.renderTodo(newTodo);
    this.persistTodos();
    input.value = "";
  };
  renderTodo = (todo) => {
    let html = `
      <li class="todo__item data-id="${todo.id}">
      <span class="delete"data-id="${todo.id}"><i class="fas fa-trash-alt"></i></span>${todo.inputTodo} 
    </li>
      `;
    todoList.insertAdjacentHTML("afterbegin", html);
  };

  markTodo = (e) => {
    const todo = e.target;
    todo.classList.toggle("completed");

    console.log(this.#todos);
  };

  persistTodos = () => {
    localStorage.setItem("todos", JSON.stringify(this.#todos));
  };

  init = () => {
    const storage = localStorage.getItem("todos");
    console.log(storage);
    if (storage) this.#todos = JSON.parse(storage);

    this.#todos.forEach((todo) => {
      this.renderTodo(todo);
    });
  };

  reset() {
    localStorage.removeItem("todos");
  }

  deleteTodo = (e) => {
    const todoEl = e.target.closest(".delete");
    const todoElpa = e.target.closest(".todo__item");

    if (!todoEl) return;

    console.log(todoElpa);

    const index = this.#todos.findIndex(
      (todo) => todo.id === todoEl.dataset.id
    );

    console.log(index);
    this.#todos.splice(index, 1);

    this.persistTodos();
    todoElpa.remove();
    console.log(this.#todos);
  };
}
const app = new App();
