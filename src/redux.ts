import { Action, Reducer, State, StoreType } from "./redux_types";

export default class Store implements StoreType<State, Action> {
  reduce: Reducer<State, Action>;

  state: State;

  subscribers: Function[];

  constructor(reducer: Reducer<State, Action>, initialState: State) {
    this.reduce = reducer;
    this.state = reducer(initialState as State, {} as Action);
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action: Action) {
    this.state = this.reduce(this.state, action);
    this.subscribers.forEach((cb) => cb(this.state));
  }

  replaceReducer(reducer: Reducer<State, Action>) {
    this.reduce = reducer;
  }

  subscribe(cb: any) {
    this.subscribers = [...this.subscribers, cb];
    cb(this.state);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== cb);
    };
  }
}
