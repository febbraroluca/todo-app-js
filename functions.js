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

const editTodo = (todoToEdit) => {
  console.log("selected todo to edit", todoToEdit);
  localStorage.setItem("todoToEdit", JSON.stringify(todoToEdit));
  location.href = `editTodo.html`;
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
  const mainEl = document.querySelector(".todoList");
  mainEl.innerHTML = "";

  const todoListUlItem = document.createElement("ul");
  todoListUlItem.classList.add("todoListUl");

  mainEl.appendChild(todoListUlItem);

  todos.forEach((todo) => {
    const todoEl = document.createElement("li");
    todoEl.classList.add("todoListItem");

    const checkboxActivityDone = document.createElement("input");
    checkboxActivityDone.setAttribute("type", "checkbox");
    checkboxActivityDone.classList.add("chkbActivityDone");
    checkboxActivityDone.checked = todo.completed;
    todoEl.appendChild(checkboxActivityDone);

    const spanEl = document.createElement("span");
    spanEl.classList.add("span-todoList-el");
    todoEl.appendChild(spanEl);

    const actionBtns = document.createElement("span");
    actionBtns.classList.add("actions-buttons");
    const delTodoBtn = document.createElement("button");
    const editTodoBtn = document.createElement("button");
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
    todoListUlItem.appendChild(todoEl);

    editTodoBtn.addEventListener("click", () => editTodo(todo));
    delTodoBtn.addEventListener("click", () => deleteTodo(todo));
    checkboxActivityDone.addEventListener("change",(e)=> {
        const todoChangedIndex = todos.findIndex(changedTodo => changedTodo.id === todo.id);
        todos[todoChangedIndex].completed = e.target.checked;
        saveTodos(todos);
        console.log(e.target.checked,todoChangedIndex,todo)
    })
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

const getEditedTodo = () => {
  const editedTodo = localStorage.getItem("todoToEdit");
  if (editedTodo) {
    return JSON.parse(editedTodo);
  } else {
    return null;
  }
};

const fillFormFields = (todoToRender) => {
  const activityDescriptionField = document.querySelector(
    "#editTodoActivityField"
  );
  const isActivityDoneChkboxField = document.querySelector(
    "#isActivityDoneChkbox"
  );
  activityDescriptionField.value = todoToRender.activity;
  isActivityDoneChkboxField.checked = todoToRender.completed;
};

const updateTodos = (todos, todoToUpdate) => {
  const indexOfEditedTodo = todos.findIndex(
    (todo) => todo.id === todoToUpdate.id
  );
  if (indexOfEditedTodo !== -1) {
    todos[indexOfEditedTodo].activity = todoToUpdate.activity;
    todos[indexOfEditedTodo].completed = todoToUpdate.completed;
  }

  saveTodos(todos);
  //renderTodos();
};
