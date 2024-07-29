import axiosConfig from "./axiosConfig";
import getUserCart from "./getUserCart";

const getCartProductsDetail = async (id, navigate) => {
  try {
    const dataCart = await getUserCart(id, navigate);
    const productsDetails = await Promise.all(
      // UNUTMA!! Promise çağırdığın her bir datayı birleştirip dizi halnde döndürür
      dataCart.carts[0].products.map(async (cart) => {
        const response = await axiosConfig.get(`products/${cart.id}`);
        return response.data;
      })
    );
    return productsDetails;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login");
    } else {
      console.error(error);
    }
    throw error;
  }
};

export default getCartProductsDetail;
