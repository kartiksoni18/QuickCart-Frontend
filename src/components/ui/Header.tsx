import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import CustomText from './CustomText';
import {Fonts} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@utils/NavigationUtils';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeocode} from '@services/mapService';

interface HeaderProps {
  showNotice: () => void;
}
const Header: FC<HeaderProps> = ({showNotice}) => {
  const {user, setUser} = useAuthStore();

  const udpateUserLocation = async () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position?.coords;
        reverseGeocode(latitude, longitude, setUser);
      },
      error => console.log('error', error),
      {enableHighAccuracy: false, timeout: 10000},
    );
  };

  useEffect(() => {
    udpateUserLocation();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CustomText
          variant="h5"
          style={{color: '#fff'}}
          fontFamily={Fonts.Medium}>
          Delivery in
        </CustomText>
        <View style={styles.estTime}>
          <CustomText
            style={{color: '#fff'}}
            fontFamily={Fonts.Bold}
            variant="h3">
            10 minutes
          </CustomText>
          <TouchableOpacity onPress={showNotice} style={styles.rainBtn}>
            <CustomText
              style={{color: '#fff'}}
              fontFamily={Fonts.Medium}
              variant="h8">
              🌧️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <CustomText
            numberOfLines={2}
            style={{color: '#fff', width: '80%'}}
            fontFamily={Fonts.Regular}
            variant="h8">
            {user?.address || 'Knowhere, Somewhere...'}
          </CustomText>
          <Icon name="menu-down" size={RFValue(20)} color="#fff" />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        <Icon name="account-circle-outline" color="#fff" size={RFValue(30)} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  subContainer: {
    // padding: 10,
    alignItems: 'flex-start',
  },
  estTime: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rainBtn: {
    backgroundColor: '#e8eaf5',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  addressContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
