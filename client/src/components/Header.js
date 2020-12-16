import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ReactComponent as BasketIcon } from "../assets/BasketIcon.svg";
import { changeCurrency, setSort } from "../reducers/goods";

const EUR = "EUR";
const CAD = "CAD";
const USD = "USD";
const NAME = "title";
const PRICE = "price";

const Header = () => {
  const [sortButtonClicked, setSortButtonClicked] = useState(false);
  const totalCount = useSelector((callback) => {
    console.log(callback, callback.basket);
    return callback.basket.count;
  });

  const dispatch = useDispatch();

  const sortList = (sortMethod) => {
    setSortButtonClicked(!sortButtonClicked);
    return dispatch(setSort(sortMethod, sortButtonClicked));
  };

  const changeCurrencyOnClick = (currency) => {
    return dispatch(changeCurrency(currency));
  };

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-4">
        <Link
          className="flex items-center flex-shrink-0 text-white mr-6"
          to="/"
        >
          <Logo />
          <span className="font-semibold font-mono tracking-widest text-3xl tracking-tight">
            matster
          </span>
        </Link>
        <div className="w-full flex justify-end lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <button
              onClick={() => sortList(NAME)}
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
            >
              Sort By Name {sortButtonClicked ? "Z→A" : "A→Z"}
            </button>
            <button
              onClick={() => sortList(PRICE)}
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
            >
              Sort by Price {sortButtonClicked ? "High→Low" : "Low→High"}
            </button>
          </div>
          <div className="text-sm lg:flex-grow">
            <button
              onClick={() => changeCurrencyOnClick(USD)}
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
            >
              {USD}
            </button>
            <button
              onClick={() => changeCurrencyOnClick(EUR)}
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
            >
              {EUR}
            </button>
            <button
              onClick={() => changeCurrencyOnClick(CAD)}
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
            >
              {CAD}
            </button>
          </div>
          {typeof totalCount !== "undefined" && totalCount > 0 ? (
            <Link
              to="/basket"
              className="cursor-pointer flex flex-row items-center px-2 py-2 leading-none text-white bg-green-400 rounded hover:text-purple-600 hover:bg-white mt-4 lg:mt-0"
            >
              {totalCount}
              <BasketIcon />
            </Link>
          ) : (
            <Link
              to="/basket"
              className="cursor-pointer px-1 py-1 leading-none text-white rounded hover:text-purple-600 hover:bg-white mt-4 lg:mt-0"
            >
              <BasketIcon />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;