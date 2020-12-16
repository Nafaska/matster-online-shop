import React from "react";
import { changeCurrency } from "../reducers/goods";
import { useDispatch } from "react-redux";

const USD = "USD";
const EUR = "EUR";
const CAD = "CAD";

const CurrencyButtons = () => {
  const dispatch = useDispatch();

  const changeCurrencyOnClick = (currency) => {
    return dispatch(changeCurrency(currency));
  };

  return (
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
  );
};

export default CurrencyButtons;
