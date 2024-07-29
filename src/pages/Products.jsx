// src/pages/Products.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import ProductList from "../components/ProductList";
import PaginationButtons from "../components/PaginationButtons";
import CategoryDropdown from "../components/CategoryDropdown";
import validateUserToken from "../config/validateUserToken";
import SearchEffect from "../config/SearchEffect.js";
import Sorting from "../components/Sorting.jsx";
import Typing from "../components/Typing.jsx";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      try {
        await validateUserToken();
        setLoading(false);
      } catch (error) {
        console.error("Kullanıcı doğrulama hatası:", error);
        navigate("/login");
      }
    };

    validateUser();
  }, [navigate]);

  if (loading) {
    return <div></div>;
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCategory("");
    setSkip(0);
    setPageNumber(1);
  };

  const handlePageChange = (direction) => {
    if (direction === 1 && skip + limit < total) {
      setSkip(skip + limit);
      setPageNumber(pageNumber + 1);
    } else if (direction === -1 && skip > 0) {
      setSkip(skip - limit);
      setPageNumber(pageNumber - 1);
    }
  };

  const setPageCount = (page) => {
    setPageNumber(page);
    setSkip(limit * (page - 1));
  };

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div>
      <div className="flex sticky top-[5.5rem] w-full justify-center flex-col items-center md:flex-col md:items-center lg:flex-col lg:items-center">
        <SearchInput handleChange={handleSearchChange} category={category} />

        {dropdownOpen && (
          <div className="flex flex-wrap items-center justify-center">
            <CategoryDropdown
              setCategory={setCategory}
              setPageNumber={setPageNumber}
              category={category ? category : "All"}
              setSkip={setSkip}
            />

            <Typing
              setPageNumber={setPageNumber}
              setSkip={setSkip}
              setType={setType}
              setOrder={setOrder}
              currentType={type}
            />
            <Sorting
              setPageNumber={setPageNumber}
              setSkip={setSkip}
              setType={setType}
              setOrder={setOrder}
              currentOrder={order}
              currentType={type}
            />
          </div>
        )}
        <i
          onClick={handleClick}
          className={`fa-solid ${
            dropdownOpen ? "fa-caret-up" : "fa-caret-down"
          }  text-red-800 text-3xl cursor-pointer`}
        ></i>
      </div>

      <ProductList products={products} />
      <PaginationButtons
        pageNumber={pageNumber}
        maxPage={maxPage}
        setPageCount={setPageCount}
        pageChange={handlePageChange}
      />
      <SearchEffect
        searchText={searchText}
        limit={limit}
        skip={skip}
        setProducts={setProducts}
        setTotal={setTotal}
        setMaxPage={setMaxPage}
        navigate={navigate}
        category={category}
        type={type}
        order={order}
      />
    </div>
  );
};

export default Products;
