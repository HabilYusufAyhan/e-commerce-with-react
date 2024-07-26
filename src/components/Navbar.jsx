import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollEffect from "../config/useScrollEffect";

const Navbar = () => {
  const [background, setBackground] = useState("bg-white");
  const [textColor, setTextColor] = useState("text-red-800");

  useScrollEffect((scrollPosition) => {
    if (scrollPosition > 250) {
      setBackground("bg-red-800");
      setTextColor("text-white hover:border-white");
    } else {
      setBackground("bg-white");
      setTextColor("text-red-800 hover:border-red-800");
    }
  });

  return (
    <nav
      className={`sticky top-0  w-full flex items-center justify-between pr-16 ${background} transition-all duration-500`}
    >
      <div className="pb-3 pt-4 pl-10 pr-10 flex items-center">
        <i className={`fa-solid fa-basket-shopping text-6xl ${textColor}`}></i>
        <h3 className={`ml-2 text-2xl ${textColor} font-semibold`}>
          ShoppingNOW
        </h3>
      </div>
      <div>
        <i className="fa-solid fa-bars text-2xl lg:hidden md:flex sm:flex text-red-800"></i>
      </div>
      <ul className="hidden items-center gap-8 lg:flex md:hidden sm:hidden">
        <li
          className={`lg:text-base uppercase ${textColor} border-b-2 border-transparent transition-all sm:text-xs md:text-sm`}
        >
          <Link to="/">
            <i className="fa-solid fa-house"></i> Home
          </Link>
        </li>
        <li
          className={`lg:text-base uppercase ${textColor} border-b-2 border-transparent transition-all sm:text-xs md:text-sm`}
        >
          <Link to="/products">
            <i className="fa-solid fa-dollar-sign"></i> Products
          </Link>
        </li>
        <li
          className={`lg:text-base uppercase ${textColor} border-b-2 border-transparent transition-all sm:text-xs md:text-sm`}
        >
          <Link to="/profile">
            <i className="fa-solid fa-user"></i> Profile
          </Link>
        </li>
        <li
          className={`lg:text-base uppercase ${textColor} border-b-2 border-transparent transition-all sm:text-xs md:text-sm`}
        >
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i> My Cart
          </Link>
        </li>
        <li
          className={`lg:text-base uppercase ${textColor} border-b-2 border-transparent transition-all sm:text-xs md:text-sm`}
        >
          <Link to="/logout">
            <i className="fa-solid fa-right-from-bracket"></i> Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
