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
  const itemInArray = arr.find(item => item.id === toUpdate.id);
  itemInArray.quantity = ammount;
  itemInArray.priceOveral = itemInArray.price * itemInArray.quantity;
  }
  return arr;
}

const calculateTotalQuantity = (items) => {
  return items.reduce((acc, rec) => {
    return acc + rec.quantity;
  }, 0);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const addedItems = updateItems(state.items, action.items);
      return {
        ...state,
        items: addedItems,
        totalPrice: calculateTotalPrice(addedItems),
        count: calculateTotalQuantity(addedItems)
      };
    case DELETE_FROM_BASKET:
      const deletedItem = deleteItem(state.items, action.toDelete);
      return {
        ...state,
        items: deletedItem,
        totalPrice: calculateTotalPrice(deletedItem),
        count: calculateTotalQuantity(deletedItem),
      };
    case CHANGE_QUANTITY:
      const updatedItems = updateQuantity(state.items, action.item, action.ammount);
      return {
        ...state,
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
        count: calculateTotalQuantity(updatedItems),
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
