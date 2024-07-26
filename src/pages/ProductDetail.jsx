import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getProduct from "../config/getProduct";
import validateUserToken from "../config/validateUserToken";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const navigate = useNavigate();

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

    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId, navigate);
        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [productId, navigate]);
  if (loading) {
    return <div></div>;
  }
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
      <div className="flex w-3/4 gap-5">
        <div className="flex gap-2">
          <div>
            <img
              className="h-96 w-96 border-2 border-red-800"
              src={product.images[0]}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <img
              className="h-32 w-32 border-2 border-red-800 border-b-0"
              src={
                product.images[1]
                  ? product.images[1]
                  : "../src/assets/emptyImage.avif"
              }
              alt=""
            />
            <img
              className="h-32 w-32 border-2 border-red-800 border-b-0"
              src={
                product.images[2]
                  ? product.images[2]
                  : "../src/assets/emptyImage.avif"
              }
              alt=""
            />
            <img
              className="h-32 border-2 border-red-800"
              src={
                product.images[3]
                  ? product.images[3]
                  : "../src/assets/emptyImage.avif"
              }
              alt=""
            />
          </div>
        </div>
        <div className="w-1/2 flex justify-between flex-col">
          <div>
            <div>
              <h2 className="font-semibold text-2xl text-red-800">
                {product.title}
              </h2>
              <div className="mt-2 mb-2 flex gap-2">
                {product.tags.map((tags) => (
                  <p className="p-1 bg-red-800 w-fit pl-2 pr-2 text-white rounded-lg">
                    {tags}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className=" font-semibold">Stock: {product.stock}</p>
              <p className="mt-1 font-semibold">
                {product.returnPolicy
                  ? "Return policy: " + product.returnPolicy
                  : ""}
              </p>
              <p className="mt-1 font-semibold">
                {product.shippingInformation
                  ? "Shipping information: " + product.shippingInformation
                  : ""}
              </p>
              <p className="mt-1 font-semibold">
                {product.warrantyInformation
                  ? "Warranty information: " + product.warrantyInformation
                  : ""}
              </p>
              <p className="mt-1 font-semibold">Dimensions:</p>
              <p className="ml-5">Width: {product.dimensions.width}</p>
              <p className="ml-5">Height: {product.dimensions.height}</p>
              <p className="ml-5">Depth: {product.dimensions.depth}</p>
            </div>
          </div>
          <div>
            <div className="flex w-full justify-between mb-1 items-center">
              <p className="ml-2 font-semibold text-xl">{product.rating}⭐️</p>
              <div className="flex items-center">
                <p className="mr-2 font-semibold text-xl">{product.price} $</p>
                <button className="p-2 pl-4 pr-4 bg-red-800 text-white rounded-lg">
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-3/4 gap-3 flex-col  border-b-2 border-red-800 pb-3 pl-2 pr-2">
        <h2 className="font-semibold text-xl text-red-800">
          Product Description
        </h2>
        <p className="text-lg ml-1 mr-1">{product.description}</p>
      </div>
      <div className="mt-8 flex w-3/4 gap-3 flex-col mb-10 pl-2 pr-2">
        <h2 className="font-semibold text-xl text-red-800">Product Reviews</h2>
        {product.reviews.map((review) => (
          <div className="flex justify-between items-center w-full ml-2 mr-2 border-b-2 border-red-800 pb-2">
            <div>
              <div className="flex items-center w-full justify-between">
                <div className="flex flex-col justify-start">
                  <h2 className="font-semibold text-lg">
                    {review.reviewerName}
                  </h2>
                  <p className="text-sm">{review.reviewerEmail}</p>
                </div>
              </div>
              <p className="mt-1 pl-2">{review.comment}</p>
            </div>
            <p className="text-xl mr-2">{review.rating}⭐️</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
