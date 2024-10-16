import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import SplashLogo from '@assets/images/splash_logo.png';
import {screenHeight, screenWidth} from '@utils/Scaling';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };
  useEffect(() => {
    const fetchUserLocation = () => {
      try {
        GeoLocation.requestAuthorization();
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
