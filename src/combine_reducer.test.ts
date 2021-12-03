import combineReducer from "./combine_reducer";
import { Action, Reducer, State } from "./redux_types";
import { initialState } from "./main";

const reducers = {
  count: jest.fn().mockReturnValue({ counter: 4 }),
  paint: jest.fn().mockReturnValue({ color: "green" }),
};

describe("Combining reducers", () => {
  let reducer: Reducer<State, Action>;
  beforeEach(() => {
    reducer = combineReducer(reducers);
  });
  test("Creating main reducer", () => {
    expect(typeof reducer === "function").toBeTruthy();
  });
  test("Checking new state", () => {
    const newState = reducer(initialState, {} as Action);
    expect(newState.count.counter).toBe(4);
    expect(newState.paint.color).toBe("green");
  });
});
