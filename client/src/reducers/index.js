import { combineReducers } from "redux"
import goods from "./goods"

const createRootReducer = () => combineReducers({
  goods
})

export default createRootReducer;