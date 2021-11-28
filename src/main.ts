import { Action, Reducer, Reducers, State } from "./redux_types";

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
