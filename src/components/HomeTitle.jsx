import React from "react";

const HomeTitle = () => {
  return (
    <div className="pb-3 pt-4 pl-10 pr-10 flex items-center">
      <i
        className={`fa-solid fa-basket-shopping text-[10rem] text-red-800`}
      ></i>
      <div className="flex flex-col items-start">
        <h3 className={`ml-2 text-6xl text-red-800 font-semibold`}>
          ShoppingNOW
        </h3>
        <a
          href={`/products/`}
          className="mt-4 p-2 pl-4 pr-4 border-2 border-red-800 bg-red-800 text-white rounded-lg hover:text-red-800 hover:bg-white transition-all"
        >
          Shopping Now!
        </a>
      </div>
    </div>
  );
};

export default HomeTitle;
