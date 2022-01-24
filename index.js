// Import stylesheets

// Write Javascript code!

//const appDiv = document.getElementById('app');
//appDiv.innerHTML = `<h2>JS Starter</h2>`;

// todo - costruire una todo app - form di input per immettere e sottomettere la nuova
// attivita da fare - al submit la nuova lista dei todo viene salvata nel local-storage
// la lista dei todo correnti viene presa dal localstorage
// predisporre un todo crud completo con EDIT e DELETE del todo
// fare in modo che l'app sia sincronizzata nel caso di più client windows aperte
// utilizzando l'evento storage su windows
// utilizzare se possibile fetch api, promise, promise chaining, await-async, classi ed
// eredità prototipale
// provare un deploy del sito statico sul server-hosting gratuito consigliato nel corso
// aggiungere un minimo di css

console.log("sto leggendo dal file index.js  ");

const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.createElement("ul");
todoList.classList.add("todoListUl");
let newTodo;

let todos = [];
let filteredTodos = [];
todos = retrieveTodos();

let filters = {
  searchText: "",
};

renderTodos(todos);

addTodoInput.addEventListener("input", function (e) {
  newTodo = {
    id: uuidv4(),
    activity: e.target.value,
    completed: false,
  };
});

searchActivityInput.addEventListener("input", function (e) {
  setFilters(filters, e.target.value);
  filteredTodos = getFilteredTodos(filters, todos, filteredTodos);
  renderTodos(filteredTodos);
});

addTodoBtn.addEventListener("click", function (e) {
  if (newTodo) {
    addTodo(newTodo);
    renderTodos(retrieveTodos(todos));
    saveTodos(todos);
    newTodo = undefined;
  }
});
