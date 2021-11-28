import { Reducer, Reducers } from "./redux_types";

export default function combineReducer<S, A>(
  reducers: Reducers<S, A>
): Reducer<S, A> {
  return function reducer(state: S, action: A): S {
    const newState = {} as S;
    Object.keys(reducers).forEach((prop) => {
      // FIXME: remove any
      (newState as any)[prop] = reducers[prop]((state as any)[prop], action);
    });
    return newState;
  };
}
