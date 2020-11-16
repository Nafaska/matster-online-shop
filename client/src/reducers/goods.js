import axios from "axios";

const GET_ALL_GOODS = "GET_ALL_GOODS";
const CHANGE_CURRENCY = "CHANGE_CURRENCY";
const SORT_BY_NAME = "SORT_BY_NAME";
const USD = "USD";

const initialState = {
  list: [],
  rate: 1,
  currency: USD,
  method: "",
  order: false,
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
    case SORT_BY_NAME:
      let arr = [...state.list];
      let sortedList = sortBy(arr, action.method);
      if (state.order) {
        return {
          ...state,
          list: sortedList.reverse(),
          method: action.method,
          order: action.order
        };
      } else {
        return {
          ...state,
          list: sortedList,
          method: action.method,
          order: action.order,
        };
      }

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
        data: currency,
      });
    });
  };
}

const sortBy = (data, method) => {
  return data.sort((a, b) => {
    if (a[method] > b[method]) {
      return 1;
    }
    if (b[method] > a[method]) {
      return -1;
    }
    return 0;
  });
};

export function setSort(method, order) {
  return {
    type: SORT_BY_NAME,
    method: method,
    order: !order,
  };
}
