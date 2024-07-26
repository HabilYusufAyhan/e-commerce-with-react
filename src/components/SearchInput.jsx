import React, { useEffect, useState } from "react";
import useScrollEffect from "../config/useScrollEffect";

const SearchInput = ({ handleChange, category }) => {
  const [background, setBackGround] = useState("bg-white");
  useScrollEffect((scrollPosition) => {
    if (scrollPosition > 250) {
      setBackGround("bg-red-800");
    } else {
      setBackGround("bg-white");
    }
  });
  let all = "All";
  return (
    <div className="w-fit flex justify-center  sticky top-[5.5rem] ">
      <div
        className={`flex items-center transition-all duration-500 pl-3 pr-3 rounded-bl-md  ${background}`}
      >
        <input
          className={`pb-2 pt-2 border-2 border-red-800 rounded-md outline-none pl-2 pr-2 w-96`}
          type="text"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
