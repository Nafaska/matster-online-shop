import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createRootReducer from "./reducers";

const middleware = [thunk];
const initialState = {};

const composeFunc =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose;
const composedEnchanters = composeFunc(applyMiddleware(...middleware));

const store = createStore(
  createRootReducer(),
  initialState,
  composedEnchanters
);

export default store;