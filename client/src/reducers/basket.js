// import axios from "axios";

const ADD_TO_BASKET = "ADD_TO_BASKET";
const DELETE_FROM_BASKET = "DELETE_FROM_BASKET";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";

const initialState = {
  items: [],
  count: 0,
  totalPrice: 0,
};

const updateItems = (existed, toAdd) => {
  const foundItems = existed.filter((item) => item.id === toAdd.id);

  const shouldAdd = foundItems.length === 0;

  if (shouldAdd) {
    toAdd.priceOveral = toAdd.price;
    toAdd.quantity = 1;
    return [...existed, toAdd];
  } else {
    toAdd.quantity += 1;
    toAdd.priceOveral = toAdd.price * toAdd.quantity;
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
    console.log(item.id, toDelete);
    return item.id !== toDelete.id;
  });
    console.log(arr, toDelete, result);

  return result;
};

const updateQuantity = (arr, toUpdate, ammount) => {
  if (ammount >= 1) {
  const itemInArray = arr.find(item => item.id === toUpdate.id);
  itemInArray.quantity = ammount;
  itemInArray.priceOveral = itemInArray.price * itemInArray.quantity;
  }
  return arr;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const addedItems = updateItems(state.items, action.items);
      return {
        ...state,
        items: addedItems,
        totalPrice: calculateTotalPrice(addedItems),
      };
    case DELETE_FROM_BASKET:
      const deletedItem = deleteItem(state.items, action.toDelete);
      return {
        ...state,
        items: deletedItem,
        totalPrice: calculateTotalPrice(deletedItem),
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        items: updateQuantity(state.items, action.item, action.ammount),
        totalPrice: calculateTotalPrice(
          updateQuantity(state.items, action.item, action.ammount)
        ),
      };
    default:
      return state;
  }
};

export function addToBasket(data) {
  return {
    type: ADD_TO_BASKET,
    items: data,
  };
}

export function deleteFromBasket(toDelete) {
  return {
    type: DELETE_FROM_BASKET,
    toDelete,
  };
}

export function changeQuantity(item, ammount) {
  return {
    type: CHANGE_QUANTITY,
    item,
    ammount
  };
}
