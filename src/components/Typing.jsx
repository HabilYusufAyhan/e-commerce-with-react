import React, { useEffect, useState } from "react";
import axiosConfig from "../config/axiosConfig";
import useScrollEffect from "../config/useScrollEffect";

const Typing = ({ setPageNumber, setSkip, setType, setOrder, currentType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [background, setBackGround] = useState("bg-white");
  const types = ["No Filter", "price", "rating", "title"];

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
    setType(type);
    setPageNumber(1);
    setDropdownOpen(false);
    setSkip(0);
  };

  return (
    <div className="flex justify-start w-fit">
      <div className={`${background} p-3 transition-all duration-500`}>
        <button
          onClick={toggleDropdown}
          className="border-2 bg-white border-red-800 rounded-md p-2 w-48 text-red-800"
        >
          {currentType ? currentType : "No Filter"}
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

export default Typing;
