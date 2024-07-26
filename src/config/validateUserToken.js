// validationConfig.js
import axiosConfig from "./axiosConfig";

async function validateUserToken() {
  let token = localStorage.getItem("ecommerce_training_token")
    ? `Bearer ${localStorage.getItem("ecommerce_training_token")}`
    : "";

  try {
    const userResponse = await axiosConfig.get("user/me", {
      headers: {
        Authorization: token,
      },
    });

    return userResponse.data;
  } catch (error) {
    throw error;
  }
}

export default validateUserToken;
