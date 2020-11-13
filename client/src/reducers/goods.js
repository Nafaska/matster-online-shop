import axios from "axios";

const GET_ALL_GOODS = "GET_ALL_GOODS";
const CHANGE_CURRENCY = "CHANGE_CURRENCY";
const USD = "USD";

const initialState = {
  list: [],
  rate: 1,
  currency: USD,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOODS:
      return {
        ...state,
        list: action.list,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.data,
        rate: action.rate,
      };
    default:
      return state;
  }
};

export function getAllGoods() {
  return (dispatch) => {
    axios.get("http://localhost:5000/api/v1/goods").then(({ data }) => {
      dispatch({
        type: GET_ALL_GOODS,
        list: data,
      });
    });
  };
}

export function changeCurrency(currency) {
  return (dispatch) => {
    axios.get("http://localhost:5000/api/v1/rates").then(({ data }) => {
      dispatch({
        type: CHANGE_CURRENCY,
        rate: data.rates[currency],
        data: currency
      })
    });
  };
}
