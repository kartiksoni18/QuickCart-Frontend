import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import SplashLogo from '@assets/images/splash_logo.png';
import {screenHeight, screenWidth} from '@utils/Scaling';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_token} from '@services/authService';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodeToken {
  exp: number;
}

const SplashScreen = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodeToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodeToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedAccessToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please login again');
        return false;
      }

      if (decodedRefreshToken?.exp < currentTime) {
        try {
          refresh_token();
          await refetchUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('There was an error refreshing token');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }

      return true;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };
  useEffect(() => {
    const fetchUserLocation = () => {
      try {
        GeoLocation.requestAuthorization();
        GeoLocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position?.coords;

            if (latitude && longitude) {
              setUser({...user, latitude, longitude});
            }
          },
          error => {
            Alert.alert('Erorr fetching location', error.message);
          },
        );

        tokenCheck();
      } catch (error) {
        Alert.alert(
          'Sorry we need your location to give you better shopping experience',
        );
      }
    };

    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearInterval(timeoutId);
  }, []);
  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Image
        source={SplashLogo}
        style={{width: screenWidth * 0.6, height: screenHeight * 0.2}}
      />
    </View>
  );
};

export default SplashScreen;
