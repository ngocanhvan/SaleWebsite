import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async (params) => {
  console.log('params: ', params)
  try {
    let url = `${base_url}product?`;
    if(params.sort){
      url+= `sort=${params.sort}`
    }
    if(params.category){
      if(!params.sort){
        url+= `category=${params.category}`
      }else{
        url+= `&category=${params.category}`
      }
    }
    const response = await axios.get(url);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const getProduct = async (userData) => {
  try {
    const response = await axios.get(`${base_url}product`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const getProductCategories = async () => {
  try {
    const response = await axios.get(`${base_url}prodcategory`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};
const getSingleProducts = async (id) => {
  try {
    const response = await axios.get(`${base_url}product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const addToWishList = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  getProduct,
  getSingleProducts,
  addToWishList,
  getProductCategories,
};
