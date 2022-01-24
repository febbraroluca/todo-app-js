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

    const checkboxActivityDone = document.createElement("input");
    checkboxActivityDone.setAttribute("type", "checkbox");
    checkboxActivityDone.classList.add("chkbActivityDone");
    todoEl.appendChild(checkboxActivityDone);

    const spanEl = document.createElement("span");
    spanEl.classList.add("span-todoList-el");
    todoEl.appendChild(spanEl);

    const actionBtns = document.createElement("span");
    actionBtns.classList.add("actions-buttons");
    const delTodoBtn = document.createElement("button");
    const editTodoBtn = document.createElement("button");
    //delTodoBtn.innerHTML = " X";
    delTodoBtn.classList.add("btn", "btn-danger", "btn-inline");
    editTodoBtn.classList.add("btn", "btn-primary", "btn-inline", "ml-5");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa", "fa-trash");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil");

    delTodoBtn.appendChild(trashIcon);
    editTodoBtn.appendChild(editIcon);

    actionBtns.appendChild(editTodoBtn);
    actionBtns.appendChild(delTodoBtn);

    todoEl.appendChild(actionBtns);

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

const setFilters = (filters, searchValue) => {
  filters.searchText = searchValue;
};

const getFilteredTodos = (filtersInput, todolist, filteredToDolIst) => {
  if (
    typeof filtersInput.searchText === "string" &&
    filtersInput.searchText !== ""
  ) {
    filteredToDolIst = todolist.filter((todo) => {
      const todoActivityString = todo.activity.toLowerCase() + "";
      return todoActivityString.includes(filtersInput.searchText.toLowerCase());
    });
    return filteredToDolIst;
  } else return todolist;
};
