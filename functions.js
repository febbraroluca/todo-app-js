
const retrieveTodos = () => {
  const todosToBeConverted = localStorage.getItem("todoList");
  if (todosToBeConverted) {
    return JSON.parse(todosToBeConverted);
  } else {
    return [];
  }
};

const saveTodos = (todos) => {
  const convertedTodos = JSON.stringify(todos);
  localStorage.setItem("todoList", convertedTodos);
};

const deleteTodo = (todoToDelete) => {
  const todoIndexToDelete = -1;

  if (todoToDelete) {
    console.log("lista todo", todos, todoToDelete);

    const todoToDel = todos.findIndex((todo) => todo.id === todoToDelete.id);
    console.log(todoToDel);

    todos.splice(todoToDel, 1);

    saveTodos(todos);
    renderTodos(todos);
  }
};

const renderTodos = (todos) => {
  todoList.innerHTML = "";
  const mainEl = document.querySelector(".todoList");
  mainEl.appendChild(todoList);

  todos.forEach((todo) => {
    const todoEl = document.createElement("li");
    todoEl.classList.add("todoListItem");
    const spanEl = document.createElement("span");
    spanEl.classList.add("span-todoList-el");
    todoEl.appendChild(spanEl);

    const delTodoBtn = document.createElement("button");
    delTodoBtn.innerHTML = " X";
    delTodoBtn.classList.add(["btn", "btn-primary", "btn-right"]);
    todoEl.appendChild(delTodoBtn);

    spanEl.textContent = todo.activity;
    todoList.appendChild(todoEl);

    delTodoBtn.addEventListener("click", () => deleteTodo(todo));
  });
};

const addTodo = (todo) => {
  todos.push(todo);

  saveTodos(todos);
  renderTodos(todos);
};
