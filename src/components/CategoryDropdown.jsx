// src/components/CategoryDropdown.jsx

import React, { useEffect, useState } from "react";
import axiosConfig from "../config/axiosConfig";
import useScrollEffect from "../config/useScrollEffect";

const CategoryDropdown = ({
  setCategory,
  setPageNumber,
  category,
  setSkip,
}) => {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [background, setBackGround] = useState("bg-white");

  useScrollEffect((scrollPosition) => {
    if (scrollPosition > 250) {
      setBackGround("bg-red-800");
    } else {
      setBackGround("bg-white");
    }
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosConfig.get("products/category-list");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    setPageNumber(1);
    setDropdownOpen(false);
    setSkip(0);
  };

  return (
    <div className="flex justify-end w-fit ">
      <div className={`${background} p-3 transition-all duration-500`}>
        <button
          onClick={toggleDropdown}
          className="border-2 bg-white border-red-800 rounded-md p-2 w-48 text-red-800"
        >
          {category}
        </button>
        {dropdownOpen && (
          <div className="absolute top-full  mt-2 border border-gray-300 bg-white shadow-lg rounded-md w-48 max-h-80 overflow-auto">
            <button
              key={1}
              onClick={() => handleCategoryClick("All")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {"All"}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDropdown;
