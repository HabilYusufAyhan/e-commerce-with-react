import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validateUserToken from "../config/validateUserToken";
import getUserCart from "../config/getUserCart";
import getCartProductsDetail from "../config/getCartProductsDetail";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const user = await validateUserToken();
        const dataCart = await getCartProductsDetail(user.id, navigate);
        console.log("Fetched Cart Data: ", dataCart);
        setCartData(dataCart);
        setLoading(false);
      } catch (error) {
        console.error("Kullanıcı doğrulama hatası:", error);
        navigate("/login");
      }
    };

    validateUser();
  }, [navigate]);

  useEffect(() => {
    console.log("Cart Data Updated: ", cartData);
  }, [cartData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const totalPrice = cartData
    .reduce((sum, cart) => sum + cart.price, 0)
    .toFixed(2);

  const shippingPrice = 15 * cartData.length;
  return (
    <div className="flex justify-between ">
      <div className="w-[70%] overflow-y-auto">
        {cartData.map((cart) => (
          <div className="mt-5 mb-5 flex justify-between items-center ml-5 mr-5 border-b-2 border-red-800">
            <div className="w-48 h-36 flex justify-center items-center border-r-2 border-red-800 mt-3 mb-3">
              <img
                className="h-max w-max object-cover mr-2 mb-2"
                src={cart.images[0]}
                alt=""
              />
            </div>
            <div className="w-full flex justify-between items-center ml-3 mr-5">
              <h2 className="font-semibold">{cart.title}</h2>
              <p className="font-semibold">{cart.price} $</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-end w-[30%] fixed right-0 flex-wrap content-center mt-5">
        <div className="border-b-2 border-t-2 border-red-800 p-2">
          <h2 className="font-semibold text-2xl text-red-800 mb-6">
            Order Summary
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2  items-center">
              <p className="text-red-800 font-semibold text-lg">
                Total price of the product:
              </p>
              <p className="text-lg">{totalPrice} $</p>
            </div>
            <div className="flex gap-2  items-center">
              <p className="text-red-800 font-semibold text-lg">
                Total shipping price:
              </p>
              <p className="text-lg">{shippingPrice} $</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-red-800 font-semibold text-lg">Total: </p>
              <p className="text-lg">
                {Number(totalPrice) + Number(shippingPrice)} $
              </p>
            </div>
          </div>
        </div>

        <button className="mt-4 p-2 pl-4 pr-4 border-2 border-red-800 bg-red-800 text-white rounded-lg hover:text-red-800 hover:bg-white transition-all">
          Confirm Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
