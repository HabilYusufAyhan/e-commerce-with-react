import React from "react";

const CircleImage = ({ product, index, productCount }) => {
  return (
    <a
      key={product.id}
      href={`/product/${product.id}`}
      className={`w-48 h-48 border-2 border-white z-10 bg-white rounded-full flex justify-center items-center relative transition-all ${
        productCount === index
          ? "scale-110 transition-all"
          : "scale-100 transition-all"
      }`}
    >
      <img
        className="object-contain w-48 h-48 p-3 animate-spin-reverse"
        src={product.images[0]}
        alt=""
      />
    </a>
  );
};

export default CircleImage;
