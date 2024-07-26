import React from "react";
import Product from "../components/Product";

const ProductList = ({ products }) => {
  return (
    <div className="mt-20 grid sm:justify-items-center md:justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
