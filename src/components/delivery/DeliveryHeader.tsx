import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {storage, tokenStorage} from '@state/storage';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeocode} from '@services/mapService';
interface DeliveryHeaderProps {
  name: string;
  email: string;
}
const DeliveryHeader: FC<DeliveryHeaderProps> = ({name, email}) => {
  const {user, setUser, logout} = useAuthStore();

  const handleLogout = () => {
    logout();
    resetAndNavigate('CustomerLogin');
    tokenStorage.clearAll();
    storage.clearAll();
  };

  const udpateUser = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeocode(latitude, longitude, setUser);
      },
      error => console.log('Error in update user', error),
      {
        enableHighAccuracy: false,
        timeout: 15000,
      },
    );
  };

  useEffect(() => {
    udpateUser();
  }, []);
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image
          source={require('@assets/images/delivery_boy.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.infoContainer}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={{color: 'white'}}>
          Hello {name}!
        </CustomText>
        <CustomText
          variant="h7"
          fontFamily={Fonts.Medium}
          style={{color: 'white'}}>
          {email}
        </CustomText>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="logout" size={RFValue(20)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 50,
    width: 50,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  img: {
    width: '100%',
    height: '100%',
    bottom: -8,
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '70%',
  },
});
