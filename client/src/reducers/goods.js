import axios from "axios";

const GET_ALL_GOODS = "GET_ALL_GOODS";
const CHANGE_CURRENCY = "CHANGE_CURRENCY";
const SORT_BY = "SORT_BY";
const USD = "USD";

let initialState = {
  list: [],
  rate: 1,
  currency: USD,
  method: "",
  order: false,
};

if (!isNaN(parseInt(localStorage.getItem("rate"), 10))) {
  initialState = {
    rate: parseFloat(localStorage.getItem("rate")),
    currency: JSON.parse(localStorage.getItem("currency")),
    method: "",
    order: false,
    list: []
  }
}

const saveCurrencyToLocalStorage = (state) => {
  localStorage.setItem("rate", JSON.stringify(state.rate));
  localStorage.setItem("currency", JSON.stringify(state.currency));
};

const goods = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOODS:
      return {
        ...state,
        list: action.list,
      };
    case CHANGE_CURRENCY:
      const newState = {
        ...state,
        currency: action.data,
        rate: action.rate,
      };
      saveCurrencyToLocalStorage(newState);
      return newState;
    case SORT_BY:
      let arr = [...state.list];
      let sortedList = sortBy(arr, action.method);
      if (state.order) {
        return {
          ...state,
          list: sortedList.reverse(),
          method: action.method,
          order: action.order,
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
  return (dispatch, getState) => {
    axios.get("http://localhost:5000/api/v1/rates").then(({ data }) => {
      dispatch({
        type: CHANGE_CURRENCY,
        rate: data.rates[currency],
        data: currency,
      });
    });
    const store = getState();
    const { currency: oldCurrency } = store.goods;
    const logsData = {
      time: +new Date(),
      action: `change currency from ${oldCurrency} to ${currency}`,
    };
    axios.post("http://localhost:5000/api/v1/logs", logsData);
  };
}

const sortBy = (data, method) => {
  const logsData = {
    time: +new Date(),
    action: `sort by ${method}`,
  };
  axios.post("http://localhost:5000/api/v1/logs", logsData);
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
    type: SORT_BY,
    method: method,
    order: !order,
  };
}

export default goods;
