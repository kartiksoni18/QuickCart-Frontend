import CustomText from '@components/ui/CustomText';
import Geolocation from '@react-native-community/geolocation';
import {useNavigationState} from '@react-navigation/native';
import {SOCKET_URL} from '@services/config';
import {getOrderById, sendLiveOrderUpdates} from '@services/orderService';
import {useAuthStore} from '@state/authStore';
import {hocStyles} from '@styles/GlobalStyles';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';

const withLiveOrder = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveOrderComponent: FC<P> = props => {
    const {currentOrder, user} = useAuthStore();
    const [myLocation, setMyLocation] = useState<any>(null);

    useEffect(() => {
      if (currentOrder) {
        const watchId = Geolocation.watchPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            setMyLocation({latitude, longitude});
          },
          error => console.log('error fetching location', error),
          {enableHighAccuracy: true, distanceFilter: 2},
        );
        return () => Geolocation.clearWatch(watchId);
      }
    }, [currentOrder]);

    useEffect(() => {
      async function sendLiveUpdates() {
        if (
          currentOrder?.deliveryPartner?._id === user?._id &&
          currentOrder?.status != 'delivered' &&
          currentOrder?.status != 'cancelled'
        ) {
          sendLiveOrderUpdates(
            currentOrder?._id,
            myLocation,
            currentOrder?.status,
          );
        }
      }

      sendLiveUpdates();
    }, [myLocation]);
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && (
          <View
            style={[
              hocStyles.cartContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={styles.flexRow}>
              <View style={styles.imgContainer}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
              <View style={{width: '65%'}}>
                <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
                  #{currentOrder?.orderId}
                </CustomText>
                <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
                  {currentOrder?.deliveryLocation?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate('DeliveryMap', {...currentOrder})}
              style={styles.btn}>
              <CustomText
                fontFamily={Fonts.SemiBold}
                variant="h8"
                style={{color: Colors.primary}}>
                CONTINUE
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return WithLiveOrderComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
});

export default withLiveOrder;
