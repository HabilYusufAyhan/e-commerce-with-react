import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getProduct from "../config/getProduct";
import HomeTitle from "../components/HomeTitle";
import CircleImage from "../components/CircleImage";
import HomeSpinCircleElement from "../components/HomeSpinCircleElement";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [mainProduct, setMainProduct] = useState(null);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const newProducts = [];
      try {
        for (let index = 0; index < 4; index++) {
          let productId = Math.floor(Math.random() * 150) + 1;
          const productData = await getProduct(productId, navigate);
          newProducts.push(productData);
        }
        setProducts(newProducts);
        setMainProduct(newProducts[0]);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProducts();
  }, [navigate]);

  // change main image
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setProductCount((prevCount) => {
          const newCount = (prevCount + 1) % products.length;
          setMainProduct(products[newCount]);
          return newCount;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [products]);

  // img loading listener
  useEffect(() => {
    if (products.length > 0) {
      let imagePromises = products.map((product) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = product.images[0];
          img.onload = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsLoading(false);
      });
    }
  }, [products]);

  return (
    <div className="flex items-center justify-between ml-10 mr-10 w-full h-full absolute overflow-hidden">
      <HomeTitle />

      {products.length > 0 && !isLoading && mainProduct && (
        <div className="w-[580px] mr-52 min-h-[580px] flex-col flex justify-center relative">
          <div className="flex justify-between relative w-[580px] animate-spin-slow">
            <HomeSpinCircleElement
              products={[products[0], products[1]]}
              indexs={[0, 1]}
              productCount={productCount}
            />
            <div className="flex items-center justify-center relative">
              <a
                href={`/product/${mainProduct.id}`}
                className="w-96 h-96 flex items-center justify-center border-2 bg-red-800 border-white rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              >
                <img
                  className="object-contain w-96 h-96 p-5 animate-spin-reverse"
                  src={mainProduct.images[0]}
                  alt=""
                />
              </a>
            </div>
            <HomeSpinCircleElement
              products={[products[2], products[3]]}
              indexs={[2, 3]}
              productCount={productCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
