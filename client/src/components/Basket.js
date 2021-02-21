import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromBasket, changeQuantity } from "../reducers/basket";

const Basket = () => {
  const dispatch = useDispatch();

  const items = useSelector((callback) => callback.basket.items);
  const totalPrice = useSelector((callback) => callback.basket.totalPrice);
  const currency = useSelector((callback) => callback.goods.currency);
  const rate = useSelector((callback) => callback.goods.rate);

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
      url: "/api/v1/logs",
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
            className="flex md:flex-row border-b-2 relative my-3 pb-3 text-gray-700 flex-col"
          >
            <div className="font-bold text-gray-700 ml-8 md:w-2/5">
              {it.title}
            </div>
            <div className="flex flex-row space-x-3 md:space-x-6 md:w-3/5 md:mr-4 mx-8">
              <div className="flex flex-row space-x-3 w-1/2">
                <p className="font-light md:text-base text-sm md:font-medium">
                  Quantity:
                </p>
                <button
                  className="bg-gray-500 text-white hover:bg-pink-500 md:font-bold font-normal rounded md:py-1 md:px-3 py-0.5 px-1"
                  onClick={() => updateQuantity(it, it.quantity - 1)}
                >
                  -
                </button>
                <div className="md:w-8 w-6 text-center	font-light md:font-medium">
                  {it.quantity}
                </div>
                <button
                  className="bg-gray-500 text-white md:text-base text-sm hover:bg-pink-500 font-light md:font-medium rounded md:py-1 md:px-3 py-0.5 px-1"
                  onClick={() => updateQuantity(it, it.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex w-1/2 flex-row justify-end space-x-3">
                <div className="text-center md:text-base text-sm font-light md:font-medium">
                  {(it.priceOveral * rate).toFixed(2)} {currency}
                </div>
                <button
                  className="bg-gray-500 text-white md:text-base text-sm hover:bg-pink-500 md:font-bold font-medium rounded md:py-1 md:px-2 py-0.5 px-1"
                  onClick={() => deleteItem(it)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="font-bold text-gray-900 pl-4 pt-4">
        Total {(totalPrice * rate).toFixed(2)} {currency}
      </div>
    </div>
  );
};

export default Basket;
