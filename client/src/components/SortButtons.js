import React, { useState } from "react";
import { setSort } from "../reducers/goods";
import { useDispatch } from "react-redux";

const NAME = "title";
const PRICE = "price";

const SortButtons = () => {
  const [sortButtonClicked, setSortButtonClicked] = useState(false);

  const dispatch = useDispatch();

  const sortList = (sortMethod) => {
    setSortButtonClicked(!sortButtonClicked);
    return dispatch(setSort(sortMethod, sortButtonClicked));
  };

  return (
    <div className="text-sm sm:flex-grow">
      <button
        onClick={() => sortList(NAME)}
        className="block lg:mt-1 lg:inline-block text-white mr-4"
      >
        Sort by Name {sortButtonClicked ? "Z→A" : "A→Z"}
      </button>
      <button
        onClick={() => sortList(PRICE)}
        className="block lg:mt-1 lg:inline-block text-white mr-4"
      >
        Sort by Price {sortButtonClicked ? "High→Low" : "Low→High"}
      </button>
    </div>
  );
};

export default SortButtons;
