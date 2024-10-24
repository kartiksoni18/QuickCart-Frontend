import CustomText from '@components/ui/CustomText';
import {useNavigationState} from '@react-navigation/native';
import {SOCKET_URL} from '@services/config';
import {getOrderById} from '@services/orderService';
import {useAuthStore} from '@state/authStore';
import {hocStyles} from '@styles/GlobalStyles';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {FC, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const {currentOrder, setCurrentOrder} = useAuthStore();
    // getting the route name on which user is present
    const routeName = useNavigationState(
      state => state.routes[state.index]?.name,
    );

    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?._id);
      setCurrentOrder(data);
    };

    useEffect(() => {
      if (currentOrder) {
        //socket instance created
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: false,
        });

        //socket initiated
        socketInstance.emit('joinRoom', currentOrder?._id);
        socketInstance.on('liveTrackingUpdates', updatedOrder => {
          setCurrentOrder(updatedOrder);
          //   fetchOrderDetails();
          console.log('RECEIVING LIVE UPDATED');
        });
        socketInstance.on('orderConfirmed', confirmOrder => {
          setCurrentOrder(confirmOrder);
          //   fetchOrderDetails();
          console.log('ORDER CONFIRMATION LIVE UPDATED');
        });

        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName === 'ProductDashboard' && (
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
              <View style={{width: '68%'}}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is - {currentOrder?.status}
                </CustomText>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  {currentOrder?.items![0]?.item.name +
                    (currentOrder?.items?.length - 1 > 0
                      ? ` and ${currentOrder?.items?.length - 1} items`
                      : '')}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={styles.btn}>
              <CustomText
                fontFamily={Fonts.SemiBold}
                variant="h8"
                style={{color: Colors.primary}}>
                VIEW
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return WithLiveStatusComponent;
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

export default withLiveStatus;