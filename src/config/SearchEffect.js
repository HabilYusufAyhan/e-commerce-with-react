import React, { useEffect } from "react";
import axiosConfig from "./axiosConfig";

const SearchEffect = ({
  searchText,
  limit,
  skip,
  setProducts,
  setTotal,
  setMaxPage,
  navigate,
  category,
  order,
  type,
}) => {
  useEffect(() => {
    const fetchProducts = async () => {
      let uri = ``;
      try {
        if (category == "") {
          category = "All";
        }
        if (category == "All" && category != "") {
          uri = `search?q=${searchText}&limit=${limit}&skip=${skip}&sortBy=${type}&order=${order}`;
        } else if (category != "All" && category != "") {
          uri = `category/${category}?limit=${limit}&skip=${skip}&sortBy=${type}&order=${order}`;
        }
        const response = await axiosConfig.get(`products/${uri}`);
        setProducts(response.data.products);
        setTotal(response.data.total);
        setMaxPage(Math.ceil(response.data.total / limit));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error(error);
        }
      }
    };

    fetchProducts();
  }, [
    searchText,
    skip,
    limit,
    navigate,
    setProducts,
    setTotal,
    setMaxPage,
    category,
    order,
    type,
  ]);

  return null;
};

export default SearchEffect;
