import { createStore } from "redux";

const addButton = document.getElementById("add");
const minusButton = document.getElementById("minus");
const counter = document.querySelector("span");

const PLUS = "PLUS";
const MINUS = "MINUS";

/** store data를 modify하는 함수, reducer
 * useState()를 예로 들면, setState와 같은 역할
 */
const reducer = (count = 0, action) => {
  switch (action.type) {
    case PLUS:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const store = createStore(reducer);

const repaintCount = () => {
  counter.innerText = store.getState();
};

store.subscribe(() => {
  repaintCount();
});

addButton.addEventListener("click", () => {
  store.dispatch({ type: PLUS });
});
minusButton.addEventListener("click", () => {
  store.dispatch({ type: MINUS });
});
