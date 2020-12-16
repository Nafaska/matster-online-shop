import axios from "axios";

const ADD_TO_BASKET = "ADD_TO_BASKET";
const DELETE_FROM_BASKET = "DELETE_FROM_BASKET";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const GET_ITEMS_FROM_BASKET = "GET_ITEMS_FROM_BASKET";
const SORT_BY = "SORT_BY";

let initialState = {
  items: [],
  count: 0,
  totalPrice: 0,
};

if (!isNaN(parseInt(localStorage.getItem("count"), 10))) {
  initialState = {
    items: JSON.parse(localStorage.getItem("items")),
    count: parseInt(localStorage.getItem("count"), 10),
    totalPrice: parseFloat(localStorage.getItem("totalPrice")),
  };
}

const updateItems = (existed, toAdd, rate) => {
  const foundItems = existed.filter((item) => item.id === toAdd.id);
  const shouldAdd = foundItems.length === 0;
  if (shouldAdd) {
    toAdd.priceOveral = toAdd.price;
    toAdd.quantity = 1;
    return [...existed, toAdd];
  } else {
    foundItems[0].quantity += 1;
    foundItems[0].priceOveral = foundItems[0].price * foundItems[0].quantity;
    return [...existed];
  }
};

const calculateTotalPrice = (items) => {
  return items.reduce((acc, rec) => {
    return acc + rec.priceOveral;
  }, 0);
};

const deleteItem = (arr, toDelete) => {
  const result = arr.filter((item) => {
    return item.id !== toDelete.id;
  });
  return result;
};

const updateQuantity = (arr, toUpdate, ammount) => {
  if (ammount >= 1) {
    const itemInArray = arr.find((item) => item.id === toUpdate.id);
    itemInArray.quantity = ammount;
    itemInArray.priceOveral = itemInArray.price * itemInArray.quantity;
  }
  return arr;
};

const calculateTotalQuantity = (items) => {
  return items.reduce((acc, rec) => {
    return acc + rec.quantity;
  }, 0);
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem("items", JSON.stringify(state.items));
  localStorage.setItem("count", JSON.stringify(state.count));
  localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ITEMS_FROM_BASKET:
      return {
        ...state,
      };
    case ADD_TO_BASKET:
      const addedItems = updateItems(state.items, action.items, state.rate);
      newState = {
        ...state,
        items: addedItems,
        totalPrice: calculateTotalPrice(addedItems),
        count: calculateTotalQuantity(addedItems),
      };
      saveStateToLocalStorage(newState);
      return newState;
    case DELETE_FROM_BASKET:
      const deletedItem = deleteItem(state.items, action.toDelete);
      newState = {
        ...state,
        items: deletedItem,
        totalPrice: calculateTotalPrice(deletedItem),
        count: calculateTotalQuantity(deletedItem),
      };
      saveStateToLocalStorage(newState);
      return newState;
    case CHANGE_QUANTITY:
      const updatedItems = updateQuantity(
        state.items,
        action.item,
        action.ammount
      );
      newState = {
        ...state,
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
        count: calculateTotalQuantity(updatedItems),
      };
      saveStateToLocalStorage(newState);
      return newState;
    default:
      return state;
  }
};

export function addToBasket(data) {
  const logsData = {
    time: +new Date(),
    action: `add ${data.title} to the backet`,
  };
  axios.post("http://localhost:5000/api/v1/logs", logsData);
  return {
    type: ADD_TO_BASKET,
    items: data,
  };
}

export function deleteFromBasket(toDelete) {
  const logsData = {
    time: +new Date(),
    action: `remove ${toDelete.title} from the backet`,
  };
  axios.post("http://localhost:5000/api/v1/logs", logsData);
  return {
    type: DELETE_FROM_BASKET,
    toDelete,
  };
}

export function changeQuantity(item, ammount) {
  return {
    type: CHANGE_QUANTITY,
    item,
    ammount,
  };
}

export function getItemsFromBasket() {
  return {
    type: GET_ITEMS_FROM_BASKET,
  };
}
