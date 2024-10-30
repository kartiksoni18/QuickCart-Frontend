import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {refresh_token} from './authService';
import {Alert} from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

// work before for sending request to the server
appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//work after the response is received from the server

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_token();
        if (newAccessToken) {
          error.config.header.Authorization = `Bearer ${newAccessToken}`;
          //calling api again
          return axios(error.config);
        }
      } catch (error) {
        console.log('Error refreshing token');
      }
    }
    if (error.response && error.response.status !== 401) {
      const errorMessage =
        error.response.data.message || 'Something went wrong!';
      // Alert.alert(errorMessage);
      console.log('errorMessage', errorMessage);
    }

    return Promise.resolve(error);
  },
);
