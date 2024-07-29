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
  return (
    <div>
      <div>
        {cartData.map((cart) => (
          <div>
            <div>
              <img src={cart.images[0]} alt="" />
            </div>
            <div>
              <h2>{cart.title}</h2>
              <p>{cart.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div></div>
        <div>
          <div>Total: </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
