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

export const fetchOrders = async (
  status: string,
  userId: string,
  branchId: string,
) => {
  try {
    let uri =
      status === 'available'
        ? `/order?status=${status}&branchId=${branchId}`
        : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;

    const response = await appAxios.get(uri);
    return response?.data;
  } catch (error) {
    console.log('Fetch Delivery order error', error);
    return null;
  }
};

export const sendLiveOrderUpdates = async (
  id: string,
  location: string,
  status: string,
) => {
  try {
    const response = await appAxios.patch(`/order/${id}/status`, {
      deliveryPartnerLocation: location,
      status,
    });

    return response?.data;
  } catch (error) {
    console.log('SendLiveOrderUpdates order error', error);
    return null;
  }
};

export const acceptOrder = async (id: string, location: string) => {
  try {
    const response = await appAxios.post(`/order/${id}/confirm`, {
      deliveryPartnerLocation: location,
    });

    return response?.data;
  } catch (error) {
    console.log('acceptOrder order error', error);
    return null;
  }
};
