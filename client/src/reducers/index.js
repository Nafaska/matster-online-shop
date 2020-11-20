import { combineReducers } from "redux"
import goods from "./goods"
import basket from "./basket";

const createRootReducer = () => combineReducers({
  goods,
  basket
})

export default createRootReducer;