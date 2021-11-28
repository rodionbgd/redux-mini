export type Action = {
  type: string;
  payload?: any;
};

export type State = {
  [key: string]: {
    [key: string]: any;
  };
};

export type Reducer<S, A> = (state: S, action: A) => State;

export type Reducers<S, A> = {
  [key: string]: Reducer<S, A>;
};
export type StoreType<S, A> = {
  getState(): S;
  dispatch(action: A): void;
  subscribe(cb: () => void): () => void;
};
