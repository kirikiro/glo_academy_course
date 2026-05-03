const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const KEY = "todoData";
let toDoData = JSON.parse(localStorage.getItem(KEY)) || [];

const save = () => localStorage.setItem(KEY, JSON.stringify(toDoData));

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");

    li.classList.add("todo-item");

    li.innerHTML = `<span class="text-todo">${item.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`;
    (item.completed ? todoCompleted : todoList).append(li);

    li.querySelector(".todo-complete").onclick = function() {
      item.completed = !item.completed;
      save();
      render();
      console.log(toDoData);
    };

    li.querySelector(".todo-remove").onclick = function() {
      toDoData = toDoData.filter((elem) => elem.id !== item.id);
      save();
      render();
      console.log(toDoData);
    };
  });
};

todoControl.onsubmit = function(event){
  event.preventDefault();
  const text = headerInput.value.trim();
  if (!text) return;

  toDoData.push({ id: Date.now(), text, completed: false });
  headerInput.value = "";
  save();
  render();
  console.log(toDoData);
};

render();
// console.log(todoCompleted);
// console.log(headerInput);
// console.log(todoList);
// console.log(todoCompleted);
