import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ReactComponent as BasketIcon } from "../assets/BasketIcon.svg";
import CurrencyButtons from "./CurrencyButtons";
import SortButtons from "./SortButtons";

const Header = () => {
  const totalCount = useSelector((callback) => {
    return callback.basket.count;
  });

  const location = useLocation();

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
        <div className="w-full flex justify-end sm:flex sm:items-center sm:w-auto">
          {location.pathname === "/" ? <SortButtons /> : <></>}
          {location.pathname === "/" || location.pathname === "/basket" ? (
            <CurrencyButtons />
          ) : (
            <></>
          )}
          {typeof totalCount !== "undefined" && totalCount > 0 ? (
            <Link
              to="/basket"
              className="cursor-pointer flex flex-row items-center px-2 py-2 leading-none text-white bg-green-400 rounded hover:text-purple-600 hover:bg-white"
            >
              {totalCount}
              <BasketIcon />
            </Link>
          ) : (
            <Link
              to="/basket"
              className="cursor-pointer px-1 py-1 leading-none text-white rounded hover:text-purple-600 hover:bg-white mt-4 sm:mt-0"
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
