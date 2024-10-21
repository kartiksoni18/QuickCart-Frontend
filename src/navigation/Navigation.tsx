import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import {navigationRef} from '@utils/NavigationUtils';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryPartnerLogin from '@features/auth/DeliveryPartnerLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import ProductCategories from '@features/categories/ProductCategories';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="CustomerLogin"
          component={CustomerLogin}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryPartnerLogin"
          component={DeliveryPartnerLogin}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="ProductDashboard"
          component={ProductDashboard}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryDashboard"
          component={DeliveryDashboard}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="ProductCategories"
          component={ProductCategories}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
