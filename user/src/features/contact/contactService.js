import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';

const postQuery = async (contactData) => {
  try {
    const response = await axios.post(`${base_url}contact`, {
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

export const contactService = {
  postQuery,
};
