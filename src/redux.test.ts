import combineReducer from "./combine_reducer";
import Store from "./redux";
import { reducers, initialState } from "./main";

describe("Redux functionality", () => {
  let store: Store;
  beforeEach(() => {
    store = new Store(combineReducer(reducers), initialState);
  });
  test("Instantiating Store", () => {
    expect(store).toBeInstanceOf(Store);
    expect(store.state).toStrictEqual(initialState);
    expect(store.subscribers).toStrictEqual(new Set());
  });
  test("Getting state", () => {
    expect(store.getState()).toStrictEqual(initialState);
  });
  test("Dispatching action", () => {
    const { counter } = store.getState().count;

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState().count.counter).toBe(counter + 1);

    store.dispatch({ type: "DECREMENT" });
    expect(store.getState().count.counter).toBe(counter);

    store.dispatch({ type: "INPUT", payload: 5 });
    expect(store.getState().count.counter).toBe(5);

    const color = "red";
    store.dispatch({ type: "COLOR_CHANGE", payload: color });
    expect(store.getState().paint.color).toBe(color);

    const state = store.getState();
    store.dispatch({ type: "INVALID" });
    expect(store.getState()).toStrictEqual(state);
  });
  describe("Subscribing/unsubscribing", () => {
    let header: HTMLHeadElement;
    let counterSub: ReturnType<typeof store.subscribe>;

    beforeEach(() => {
      document.body.innerHTML = `
          <section id="app">
                <h1 id="header">Counter: 0</h1>
          </section>
          `;
      header = <HTMLHeadElement>document.getElementById("header");
      counterSub = store.subscribe(() => {
        header.innerHTML = `Counter: ${store.getState().count.counter}`;
      });
    });
    test("Subscribing", () => {
      store.dispatch({ type: "INCREMENT" });
      expect(header.innerHTML).toBe("Counter: 1");

      store.dispatch({ type: "DECREMENT" });
      expect(header.innerHTML).toBe("Counter: 0");
      expect(store.subscribers.size).toBe(1);
    });
    test("Unsubscribing", () => {
      counterSub();
      store.dispatch({ type: "INCREMENT" });
      expect(header.innerHTML).toBe("Counter: 0");
      expect(store.subscribers.size).toBe(0);
    });
  });
});
