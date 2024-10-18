import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './axiosInterceptor';

export const customerLogin = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, userData);
    const {accessToken, refreshToken, customer} = response?.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {user, setUser} = useAuthStore.getState();

    if (user) {
      const updatedUser = {
        ...customer,
        latitude: user.latitude,
        longitude: user.longitude,
      };

      setUser(updatedUser);
    }
  } catch (error) {
    console.log('error', error);
    throw new Error('Login Error');
  }
};

export const deliveryPartnerLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/deliveryPartner/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliveryPartner} = response?.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {user, setUser} = useAuthStore.getState();

    if (user) {
      const updatedUser = {
        ...deliveryPartner,
        latitude: user.latitude,
        longitude: user.longitude,
      };

      setUser(updatedUser);
    }
  } catch (error) {
    console.log('error', error);
    throw new Error('Login Error');
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    setUser(response?.data?.user);
  } catch (error) {
    console.log('Login error', error);
  }
};

export const refresh_token = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const newRefreshToken = response?.data?.refreshToken;
    const newAccessToken = response?.data?.accessToken;

    tokenStorage.set('refreshToken', newRefreshToken);
    tokenStorage.set('accessToken', newAccessToken);

    return newRefreshToken;
  } catch (error) {
    console.log('Refresh Token error', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};
