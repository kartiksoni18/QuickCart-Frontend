import {appAxios} from './axiosInterceptor';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items,
      branch: '67065782203576d69f95ebe0',
      totalPrice,
    });

    return response?.data;
  } catch (error) {
    console.log('Create order error', error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.post(`/order/${id}`);

    return response?.data;
  } catch (error) {
    console.log('Fetch order error', error);
    return null;
  }
};

export const fetchCustomerOrders = async (user_id: string) => {
  try {
    const response = await appAxios.get(`/order?customerId=${user_id}`);
    return response?.data;
  } catch (error) {
    console.log('Fetch customer order error', error);
    return null;
  }
};
