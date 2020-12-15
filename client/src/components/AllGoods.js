import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGoods } from "../reducers/goods";
import { addToBasket } from "../reducers/basket";
import { ReactComponent as AddToBasketIcon } from "../assets/AddToBasketIcon.svg";

const AllGoods = () => {
  const dispatch = useDispatch();

  const allGoodslist = useSelector((callback) => callback.goods.list);
  const currency = useSelector((callback) => callback.goods.currency);
  const rate = useSelector((callback) => callback.goods.rate);
  const basket = useSelector((callback) => callback.basket.items);

  const addedProductQuantity = (product) => {
    return basket.map((item) => {
      if (typeof item.quantity !== "undefined" && item.id === product.id) {
        return item.quantity;
      }
    });
  };

  const addToBasketButton = (product) => {
    return dispatch(addToBasket(product));
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
    dispatch(getAllGoods());
    return () => {};
  }, [dispatch]);

  return (
    <div className="flex flex-wrap">
      {allGoodslist.map((product) => {
        const convertedPrice = product.price * rate;
        return (
          <div
            key={product.id}
            className="flex justify-between px-2 pt-4 items-end flex-col flex-auto w-2/5 items-center overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <img src={product.image} alt={product.title} className="rounded" />
            <div className="font-bold text-gray-700 py-2">{product.title}</div>
            <div className="flex text-gray-600 self-stretch font-semibold text-sm justify-between items-center">
              {convertedPrice.toFixed(2)} {currency}
              <button
                title="Add to Bag"
                className="bg-gray-500 text-white hover:bg-pink-500 flex flex-row items-center rounded py-2 px-2"
                onClick={() => addToBasketButton(product)}
              >
                {addedProductQuantity(product)}
                <AddToBasketIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllGoods;
