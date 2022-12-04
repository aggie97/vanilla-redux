import { createStore } from "redux";

// const addButton = document.getElementById("add");
// const minusButton = document.getElementById("minus");
// const counter = document.querySelector("span");

// const PLUS = "PLUS";
// const MINUS = "MINUS";

// /** store data를 modify하는 함수, reducer
//  * useState()를 예로 들면, setState와 같은 역할
//  */
// const countReducer = (count = 0, action) => {
//   switch (action.type) {
//     case PLUS:
//       return count + 1;
//     case MINUS:
//       return count - 1;
//     default:
//       return count;
//   }
// };

// const store = createStore(countReducer);

// const repaintCount = () => {
//   counter.innerText = store.getState();
// };

// store.subscribe(() => {
//   repaintCount();
// });

// addButton.addEventListener("click", () => {
//   store.dispatch({ type: PLUS });
// });
// minusButton.addEventListener("click", () => {
//   store.dispatch({ type: MINUS });
// });

/* --------------------------------------- */

const form = document.querySelector("form");
const input = document.getElementById("todoInput");
const todoUl = document.getElementById("todoUl");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const todoReducer = (todos = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() };
      return [newTodoObj, ...todos];

    case DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.id);

    default:
      return todos;
  }
};

const todoStore = createStore(todoReducer);

const dispatchAddTodo = (text) => {
  todoStore.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteTodo(id));
};

const paintTodos = (todo) => {
  const todoLi = document.createElement("li");
  const doneBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  todoLi.id = todo.id;
  todoLi.innerText = todo.text;
  doneBtn.innerText = "✅";
  deleteBtn.innerText = "❌";

  deleteBtn.addEventListener("click", dispatchDeleteTodo);

  todoLi.appendChild(doneBtn);
  todoLi.appendChild(deleteBtn);
  todoUl.appendChild(todoLi);
};

todoStore.subscribe(() => {
  const todoArray = todoStore.getState();
  console.log(todoArray);
  todoUl.innerHTML = "";
  todoArray.forEach((todo) => {
    paintTodos(todo);
  });
});

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
