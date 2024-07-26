import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const { id, title, description, price, rating, images } = props.product;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      setIsLoading(false);
    };
  }, [images]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="cursor-pointer sm:max-w-96 m-4 h-96 flex flex-col justify-between bg-white border-2 border-[#960000] rounded-md">
      <div onClick={(e) => navigate(`/product/${id}`)}>
        <div className="flex items-center justify-center">
          <img className="h-48" src={images[0]} alt={title} />
        </div>
        <div className="flex-1 overflow-hidden pl-2 pt-1">
          <h2 className="font-semibold">
            {title}
            {rating > 4 ? "🏅" : ""}
          </h2>
          <p className="overflow-y-auto h-20 scrollbar-none text-black">
            {description}
          </p>
        </div>
        <div className="flex justify-between pt-1 pl-2 pr-2 pb-2">
          <p>
            Price: ${price}
            {price < 10 ? (
              <span className="ml-2 text-white bg-green-600 p-1 text-xs rounded-md">
                CHEAP
              </span>
            ) : (
              ""
            )}
          </p>
          <p
            className={
              rating < 2
                ? "text-red-600"
                : rating >= 2 && rating < 3
                ? "text-yellow-400"
                : rating >= 3 && rating < 4
                ? "text-green-800"
                : rating > 4
                ? "text-green-400"
                : "text-black"
            }
          >
            {rating}⭐️
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between bg-[#960000]">
        <button className="w-full h-10 border-r-[1px] border-t-transparent border-t-[2px] transition-all text-white hover:bg-white hover:text-[#960000] hover:border-t-[#960000] hover:border-t-[2px]">
          Buy Now!
        </button>
        <button className="w-full h-10 border-l-[1px] border-t-transparent border-t-[2px] transition-all text-white hover:bg-white hover:text-[#960000] hover:border-t-[#960000] hover:border-t-[2px]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
