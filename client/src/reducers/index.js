import { combineReducers } from "redux";
import goods from "./goods";
import basket from "./basket";
import logs from "./logs";

const createRootReducer = () => combineReducers({
  goods,
  basket,
  logs
})

export default createRootReducer;