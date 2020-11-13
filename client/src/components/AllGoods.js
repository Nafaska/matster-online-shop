import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGoods } from "../reducers/goods";
import { ReactComponent as AddToBag } from "../assets/AddToBag.svg";

const AllGoods = () => {
  const dispatch = useDispatch();

  const allGoodslist = useSelector((callback) => callback.goods.list);
  const currency = useSelector((callback) => callback.goods.currency);
  const rate = useSelector((callback) => callback.goods.rate);

  useEffect(() => {
    dispatch(getAllGoods());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap">
      {allGoodslist.map((it) => {
        const convertedPrice = it.price * rate;
        return (
          <div
            key={it.id}
            className="flex justify-between px-2 pt-4 items-end flex-col flex-auto w-2/5 items-center overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <img src={it.image} alt={it.title} className="rounded" />
            <div className="font-bold text-gray-700 py-2">{it.title}</div>
            <div className="flex text-gray-600 self-stretch font-semibold text-sm justify-between items-center">
              {convertedPrice.toFixed(2)} {currency}
              <button
                title="Add to Bag"
                className="bg-gray-500 text-white hover:bg-pink-500 rounded py-1 px-2"
              >
                <AddToBag />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllGoods;
