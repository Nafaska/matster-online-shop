import React from "react";
import { changeCurrency } from "../reducers/goods";
import { useDispatch } from "react-redux";

const USD = "USD";
const EUR = "EUR";
const SEK = "SEK";

const CurrencyButtons = () => {
  const dispatch = useDispatch();

  const changeCurrencyOnClick = (currency) => {
    return dispatch(changeCurrency(currency));
  };

  return (
    <div className="text-sm sm:flex-grow">
      <button
        onClick={() => changeCurrencyOnClick(USD)}
        className="block sm:mt-1 sm:inline-block text-white mr-4"
      >
        {USD}
      </button>
      <button
        onClick={() => changeCurrencyOnClick(EUR)}
        className="block sm:mt-1 sm:inline-block text-white mr-4"
      >
        {EUR}
      </button>
      <button
        onClick={() => changeCurrencyOnClick(SEK)}
        className="block sm:mt-1 sm:inline-block text-white mr-4"
      >
        {SEK}
      </button>
    </div>
  );
};

export default CurrencyButtons;
