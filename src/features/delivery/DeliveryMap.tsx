import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {
  acceptOrder,
  getOrderById,
  sendLiveOrderUpdates,
} from '@services/orderService';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import LiveTrackingHeader from '@features/map/LiveTrackingHeader';
import LiveMap from '@features/map/LiveMap';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import {hocStyles} from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';
import MapView from 'react-native-maps';

const DeliveryMap = () => {
  const {user, setCurrentOrder} = useAuthStore();
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);

  const route = useRoute();

  const ordreDetails = route?.params as Record<any, string>;

  let msg = 'Start this order';
  if (
    orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status === 'confirmed'
  ) {
    msg = 'Grab your order';
  } else if (
    orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status === 'arriving'
  ) {
    msg = 'Complete your order';
  } else if (
    orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status === 'delivered'
  ) {
    msg = 'Your milestone';
  } else if (
    orderData?.deliveryPartner?._id !== user?._id &&
    orderData?.status !== 'available'
  ) {
    msg = 'You missed it!';
  }

  const fetchOrderDetails = async () => {
    const data = await getOrderById(ordreDetails?._id);

    setOrderData(data);
  };

  const handleAcceptOrder = async () => {
    try {
      const data = await acceptOrder(orderData?._id, myLocation);
      if (data) {
        setCurrentOrder(data);
        Alert.alert('Order accepted', 'Grab your package');
      } else {
        Alert.alert('There was an error');
        return;
      }
      fetchOrderDetails();
    } catch (error) {
      console.log('error accepting order');
      //   Alert.alert('There was an error');
    }
  };
  const handleOrderPickedUp = async () => {
    try {
      const data = await sendLiveOrderUpdates(
        orderData?._id,
        myLocation,
        'arriving',
      );
      if (data) {
        setCurrentOrder(data);
        Alert.alert('Order Picked Up', 'Have a safe ride');
      } else {
        Alert.alert('There was an error');
        return;
      }
      fetchOrderDetails();
    } catch (error) {
      console.log('error picking order');
      Alert.alert('There was an error');
    }
  };
  const handleOrderDelivered = async () => {
    try {
      const data = await sendLiveOrderUpdates(
        orderData?._id,
        myLocation,
        'delivered',
      );
      if (data) {
        setCurrentOrder(null);
        Alert.alert('Great!!', 'Hope on to the next one');
      } else {
        Alert.alert('There was an error');
        return;
      }
      fetchOrderDetails();
    } catch (error) {
      console.log('error delivering order');
      Alert.alert('There was an error');
    }
  };

  useEffect(() => {
    async function sendLiveUpdates() {
      if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status !== 'delivered' &&
        orderData?.status !== 'cancelled'
      ) {
        await sendLiveOrderUpdates(
          orderData?._id,
          myLocation,
          orderData?.status,
        );
        fetchOrderDetails();
      }
    }
    sendLiveUpdates();
  }, []);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position?.coords;
        setMyLocation({latitude, longitude});
      },
      error => console.log('Error fetching Geolocation', error),
      {enableHighAccuracy: true, distanceFilter: 2},
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View style={styles.container}>
      <LiveTrackingHeader
        type="Delivery"
        title={msg}
        secondTitle="Delivery in 10 minutes"
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {orderData && (
          <LiveMap
            deliveryLocation={orderData?.deliveryLocation || null}
            deliveryPersonLocation={
              orderData?.deliveryPartner?.liveLocation || myLocation
            }
            hasAccepted={
              orderData?.deliveryPartner?._id === user?._id &&
              orderData?.status === 'confirmed'
            }
            hasPickedUp={orderData?.status === 'arriving'}
            pickupLocation={orderData?.pickupLocation}
          />
        )}

        <DeliveryDetails details={orderData?.customer} />
        <OrderSummary order={orderData} />

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
              Do you like my app clone?
            </CustomText>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              Please provide me with a high appraisel!
            </CustomText>
          </View>
        </View>

        <CustomText
          style={{opacity: 0.4, alignSelf: 'center', marginTop: 40}}
          fontSize={RFValue(18)}
          fontFamily={Fonts.Bold}>
          Kartik Soni ft. Quickcart
        </CustomText>
      </ScrollView>

      {orderData?.status !== 'delivered' &&
        orderData?.status !== 'cancelled' && (
          <View style={[hocStyles.cartContainer, {padding: 10}]}>
            {orderData?.status === 'available' && (
              <CustomButton
                title="Accept Order"
                onPress={handleAcceptOrder}
                loading={false}
              />
            )}
            {orderData?.status === 'confirmed' &&
              orderData?.deliveryPartner?._id === user?._id && (
                <CustomButton
                  title="Order Picked Up"
                  onPress={handleOrderPickedUp}
                  loading={false}
                />
              )}
            {orderData?.status === 'arriving' &&
              orderData?.deliveryPartner?._id === user?._id && (
                <CustomButton
                  title="Order Delivered"
                  onPress={handleOrderDelivered}
                  loading={false}
                />
              )}
          </View>
        )}
    </View>
  );
};

export default DeliveryMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5C5C',
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
    // flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
