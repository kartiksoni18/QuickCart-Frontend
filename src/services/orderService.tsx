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
