import axios from 'axios';
import {appAxios} from './axiosInterceptor';
import {BASE_URL} from './config';

export const makePayment = async (amount: number) => {
  try {
    const secretKey =
      'sk_test_51I8JqzCkjw2NURwjobBh68F6h3kfJ8Ik8MbhpNy6MxcjQ7hGpzUGfubn4eS09VOX4cRhZFbYPqeNf32IwdMcdb6q00N9BJFESB';

    // Include the secretKey in the Authorization header as Bearer token
    const response = await axios.post(
      `${BASE_URL}/create-payment-intent`,
      {
        amount: amount, // Send the dynamic amount
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`, // Add the secretKey in the Authorization header
        },
      },
    );

    return response?.data;
  } catch (error) {
    console.log('Error in making payment:', error);
  }
};
