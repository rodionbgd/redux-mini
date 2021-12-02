export type Action = {
  type: string;
  payload?: any;
};

export type State = {
  [key: string]: any;
};

export type Reducer<S extends State, A extends Action> = (
  state: S | undefined,
  action: A
) => S;

export type Reducers<S extends State, A extends Action> = {
  [key: string]: Reducer<S, A>;
};
export type StoreType<S extends State, A extends Action> = {
  getState(): S;
  dispatch(action: A): void;
  subscribe(cb: () => void): () => void;
};
