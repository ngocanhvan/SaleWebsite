import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  try {
    const response = await axios.get(`${base_url}blog`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      // }
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const getBlogCategories = async () => {
  try {
    const response = await axios.get(`${base_url}blogcategory`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const getBlog = async (id) => {
  try {
    const response = await axios.get(`${base_url}blog/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      // }
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

export const blogService = {
  getBlogs,
  getBlog,
  getBlogCategories,
};
