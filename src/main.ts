import { Action, Reducer, Reducers, State } from "./redux_types";
import combineReducer from "./combine_reducer";
import Store from "./redux";

const setColor: Reducer<State, Action> = function setColor(
  state: State,
  action: Action
): State {
  switch (action.type) {
    case "COLOR_CHANGE":
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};

const counter: Reducer<State, Action> = function counter(
  state: State,
  action: Action
): State {
  let newCounter = 0;
  switch (action.type) {
    case "INCREMENT":
      newCounter = Number(state.counter) + 1;
      return {
        ...state,
        counter: newCounter as any,
      };
    case "DECREMENT":
      newCounter = Number(state.counter) - 1;
      return {
        ...state,
        counter: newCounter as any,
      };
    case "INPUT":
      newCounter = Number(state.counter) + action.payload;
      return {
        ...state,
        counter: newCounter as any,
      };
    default:
      return state;
  }
};

export const reducers: Reducers<State, Action> = {
  count: counter,
  paint: setColor,
};

export const initialState: State = {
  count: {
    counter: 0,
  },
  paint: {
    color: 0,
  },
};

export function init() {
  const store = new Store(combineReducer(reducers), initialState);
  const incBtn = <HTMLButtonElement>document.querySelector(".inc");
  const decBtn = <HTMLButtonElement>document.querySelector(".dec");
  const addBtn = <HTMLButtonElement>document.querySelector(".add");
  const numberInput = <HTMLInputElement>(
    document.querySelector('input[type="number"]')
  );
  const colorInput = <HTMLInputElement>(
    document.querySelector('input[type="color"]')
  );
  const pColor = <HTMLParagraphElement>document.getElementById("color");
  const header = <HTMLHeadElement>document.querySelector("h1");

  incBtn.addEventListener("click", () => store.dispatch({ type: "INCREMENT" }));
  decBtn.addEventListener("click", () => store.dispatch({ type: "DECREMENT" }));
  addBtn.addEventListener("click", () =>
    store.dispatch({ type: "INPUT", payload: Number(numberInput.value) })
  );

  colorInput.addEventListener("input", () =>
    store.dispatch({ type: "COLOR_CHANGE", payload: colorInput.value })
  );
  store.subscribe(() => {
    header.innerHTML = `Counter: ${store.getState().count.counter}`;
  });

  store.subscribe(() => {
    pColor.style.color = `${store.getState().paint.color}`;
  });
}

window.addEventListener("load", init);
