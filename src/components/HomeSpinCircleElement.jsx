import React from "react";
import CircleImage from "./CircleImage";

const HomeSpinCircleElement = ({ products, indexs, productCount }) => {
  return (
    <div className="flex flex-col justify-between h-[580px]">
      <CircleImage
        product={products[0]}
        index={indexs[0]}
        productCount={productCount}
      />
      <CircleImage
        product={products[1]}
        index={indexs[1]}
        productCount={productCount}
      />
    </div>
  );
};

export default HomeSpinCircleElement;
