import React from "react";

const PaginationButtons = ({
  pageNumber,
  maxPage,
  setPageCount,
  pageChange,
}) => {
  return (
    <div className="w-full flex justify-center gap-5 items-center">
      <button
        className={`text-red-800 text-6xl ${
          pageNumber === 1 ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => pageChange(-1)}
        disabled={pageNumber === 1}
      >
        {"<"}
      </button>
      {pageNumber > 2 && (
        <button
          className="text-2xl text-red-800 w-10 border-red-800"
          onClick={() => setPageCount(pageNumber - 2)}
        >
          {pageNumber - 2}
        </button>
      )}
      {pageNumber > 1 && (
        <button
          className="text-2xl text-red-800 w-10 border-red-800"
          onClick={() => setPageCount(pageNumber - 1)}
        >
          {pageNumber - 1}
        </button>
      )}
      <button className="text-2xl text-red-800 w-10 border-l-4 border-r-4 border-red-800">
        {pageNumber}
      </button>
      {pageNumber < maxPage && (
        <button
          className="text-2xl text-red-800 w-10 border-red-800"
          onClick={() => setPageCount(pageNumber + 1)}
        >
          {pageNumber + 1}
        </button>
      )}
      {pageNumber < maxPage - 1 && (
        <button
          className="text-2xl text-red-800 w-10 border-red-800"
          onClick={() => setPageCount(pageNumber + 2)}
        >
          {pageNumber + 2}
        </button>
      )}
      <button
        className={`text-red-800 text-6xl ${
          pageNumber === maxPage ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => pageChange(1)}
        disabled={pageNumber === maxPage}
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationButtons;
