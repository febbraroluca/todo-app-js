let editedTodo = getEditedTodo();
const buttonBack = document.querySelector(".btnBackToIndex");
const inputEditActivity = document.querySelector("#editTodoActivityField");
const chkActivityDone = document.querySelector("#isActivityDoneChkbox");
const btnSubmit = document.querySelector(".btnSubmit");
const todos = retrieveTodos();

buttonBack.addEventListener("click", () => {
  location.href = "./index.html";
});

inputEditActivity.addEventListener("input", (e) => {
  editedTodo = { ...editedTodo, activity: e.target.value };
});

chkActivityDone.addEventListener("change", (e) => {
  editedTodo = { ...editedTodo, completed: e.target.checked };
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  updateTodos(todos, editedTodo);
  editedTodo = getEditedTodo();
  console.log("edited todo dopo l update", editedTodo);
  fillFormFields(editedTodo);
});

fillFormFields(editedTodo);
