import combineReducer from "./combine_reducer";
import { init, initialState, reducers } from "./main";
import Store from "./redux";

const getStateMock = jest.fn();
const dispatchMock = jest.fn();
const subscribeMock = jest.fn();

jest.mock("./redux.ts", () => jest.fn);
(Store as jest.Mock).mockImplementation(() => ({
  getState: getStateMock,
  dispatch: dispatchMock,
  subscribe: subscribeMock,
}));

describe("Testing main functionality", () => {
  let store: Store;

  let incBtn: HTMLButtonElement;
  let decBtn: HTMLButtonElement;
  let addBtn: HTMLButtonElement;
  let numberInput: HTMLInputElement;
  let colorInput: HTMLInputElement;
  let pColor: HTMLParagraphElement;
  let header: HTMLHeadElement;

  beforeEach(() => {
    document.body.innerHTML = `
       <section id="app">
            <h1>Counter: 0</h1>
            <button class="inc">+</button>
            <button class="dec">-</button>
            <input type="number" value="3">
            <button class="plus">add</button>
            <section>
                <input type="color" value="">
                <p id="color">Fill</p>
            </section>
       </section>
       `;
    store = new Store(combineReducer(reducers), initialState);
    incBtn = <HTMLButtonElement>document.querySelector(".inc");
    decBtn = <HTMLButtonElement>document.querySelector(".dec");
    addBtn = <HTMLButtonElement>document.querySelector(".add");
    numberInput = <HTMLInputElement>(
      document.querySelector('input[type="number"]')
    );
    colorInput = <HTMLInputElement>(
      document.querySelector('input[type="color"]')
    );
    pColor = <HTMLParagraphElement>document.getElementById("color");
    header = <HTMLHeadElement>document.querySelector("h1");
    init();
  });
  test("Dispatching events", () => {
    incBtn.dispatchEvent(new MouseEvent("click"));
    expect(dispatchMock).toHaveBeenCalledWith({ type: "INCREMENT" });
    dispatchMock.mockClear();

    decBtn.dispatchEvent(new MouseEvent("click"));
    expect(dispatchMock).toHaveBeenCalledWith({ type: "DECREMENT" });
    dispatchMock.mockClear();

    addBtn.dispatchEvent(new MouseEvent("click"));
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "INPUT",
      payload: Number(numberInput.value),
    });
    dispatchMock.mockClear();

    colorInput.dispatchEvent(new Event("input"));
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "COLOR_CHANGE",
      payload: colorInput.value,
    });
    dispatchMock.mockClear();
  });
});
