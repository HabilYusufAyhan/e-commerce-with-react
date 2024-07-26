import axiosConfig from "./axiosConfig";

const getProduct = async (id, navigate) => {
  try {
    const response = await axiosConfig.get(`products/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login");
    } else {
      console.error(error);
    }
    throw error; // Hata durumunda hata fırlatın
  }
};

export default getProduct;
