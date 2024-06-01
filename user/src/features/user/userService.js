import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
      if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
      }
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data?.token) {
      localStorage.setItem("customer", JSON.stringify(response.data));
      return response.data;
    } else {
      alert("Sai thông tin tài khoản, vui lòng đăng nhập lại!");
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const getUserWishlist = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserOrder = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-user-orders`, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const clearUserCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config);
  if (response.data) {
    return response.data;
  }
};

const createAnOrder = async (orderData) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderData,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};
const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const updateProductFromCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const logout = async () => {
  try {
    // Xóa dữ liệu đăng nhập từ lưu trữ trình duyệt
    localStorage.removeItem("customer");
    localStorage.removeItem("token");

    // Trả về thành công nếu không có lỗi xảy ra
    return;
  } catch (error) {
    // Xử lý các ngoại lệ xảy ra trong quá trình đăng xuất
    throw new Error(error.message);
  }
};

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  clearUserCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createAnOrder,
  logout,
  getUserOrder,
};
