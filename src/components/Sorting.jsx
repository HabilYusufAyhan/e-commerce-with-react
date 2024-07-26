import React, { useEffect, useState } from "react";
import axiosConfig from "../config/axiosConfig";
import useScrollEffect from "../config/useScrollEffect";

const Sorting = ({
  setPageNumber,
  setSkip,
  setType,
  setOrder,
  currentOrder,
  currentType,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [background, setBackGround] = useState("bg-white");
  const types = ["asc", "desc"];
  useScrollEffect((scrollPosition) => {
    if (scrollPosition > 250) {
      setBackGround("bg-red-800");
    } else {
      setBackGround("bg-white");
    }
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTypeClick = (type) => {
    setOrder(type);
    setPageNumber(1);
    setDropdownOpen(false);
    setSkip(0);
  };

  return (
    <div
      className={`justify-start w-fit ${
        currentType != "No Filter" && currentType != "" ? "flex" : "hidden"
      }`}
    >
      <div
        className={`${background} p-3 transition-all duration-500 rounded-r-md`}
      >
        <button
          onClick={toggleDropdown}
          className="border-2 bg-white border-red-800 rounded-md p-2 w-48 text-red-800"
        >
          {currentOrder ? currentOrder : "Sorting"}
        </button>
        {dropdownOpen && (
          <div className="absolute top-full  mt-2 border border-gray-300 bg-white shadow-lg rounded-md w-48 max-h-80 overflow-auto">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeClick(type)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sorting;
