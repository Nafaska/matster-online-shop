import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromBasket, changeQuantity } from "../reducers/basket";

const Basket = () => {
  const dispatch = useDispatch();

  const items = useSelector((callback) => callback.basket.items);
  const totalPrice = useSelector((callback) => callback.basket.totalPrice);
  const currency = useSelector((callback) => callback.goods.currency);

  const deleteItem = (item) => {
    return dispatch(deleteFromBasket(item));
  };

  const updateQuantity = (item, amount) => {
    if (item.quantity <= 1 && amount <= 1) {
      return dispatch(deleteFromBasket(item));
    }
    return dispatch(changeQuantity(item, amount));
  };

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/logs",
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`,
      },
    });
    return () => {};
  }, []);

  return (
    <div>
      {Object.values(
        items.map((it) => (
          <div
            key={it.id}
            className="flex flex-row relative mt-4 text-gray-700"
          >
            <div className="font-bold text-gray-700 ml-8 w-2/5">{it.title}</div>
            <div className="flex flex-row space-x-6">
              <div className="flex flex-row space-x-3">
                <p className="font-medium">Quantity:</p>
                <button
                  className="bg-gray-500 text-white hover:bg-pink-500 font-bold rounded py-1 px-3"
                  onClick={() => updateQuantity(it, it.quantity - 1)}
                >
                  -
                </button>
                <div className="font-medium">{it.quantity}</div>
                <button
                  className="bg-gray-500 text-white hover:bg-pink-500 font-medium rounded py-1 px-3"
                  onClick={() => updateQuantity(it, it.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="font-medium">
                {it.priceOveral} {currency}
              </div>
              <button
                className="bg-gray-500 text-white hover:bg-pink-500 font-bold	rounded py-1 px-2"
                onClick={() => deleteItem(it)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="font-bold text-gray-900 pl-4 pt-4">
        Total {totalPrice} {currency}
      </div>
    </div>
  );
};

export default Basket;
