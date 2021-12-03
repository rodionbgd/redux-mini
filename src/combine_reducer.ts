import { Action, Reducer, Reducers, State } from "./redux_types";

export default function combineReducer<S extends State, A extends Action>(
  reducers: Reducers<S, A>
): Reducer<S, A> {
  return (state: S | undefined, action: A): S => {
    const newState = {} as S;
    Object.keys(reducers).forEach((prop) => {
      if (state) {
        (newState as Record<string, any>)[prop] = reducers[prop](
          state[prop],
          action
        );
      }
    });
    return newState;
  };
}
