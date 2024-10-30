import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {getOrderById} from '@services/orderService';
import {Colors, Fonts} from '@utils/Constants';
import LiveTrackingHeader from './LiveTrackingHeader';
import LiveMap from './LiveMap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';

const LiveTracking = () => {
  const {currentOrder, setCurrentOrder} = useAuthStore();

  let msg = 'Packing your order';
  let time = 'Arriving in 10 minutes';

  if (currentOrder?.status === 'confirmed') {
    msg = 'Arriving Soon';
    time = 'Arriving in 8 minutes';
  } else if (currentOrder?.status === 'arriving') {
    msg = 'Order Picked Up';
    time = 'Arriving in 6 minutes';
  } else if (currentOrder?.status === 'delivered') {
    msg = 'Order Delivered';
    time = 'Fastest Delivery ⚡️';
  }

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id);
    console.log('data', JSON.stringify(data));
    setCurrentOrder(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <View style={styles.container}>
      <LiveTrackingHeader type="Customer" title={msg} secondTitle={time} />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* <LiveMap pickupLocation={}/> */}
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomText
              variant="h7"
              fontFamily={Fonts.SemiBold}
              numberOfLines={1}>
              {currentOrder?.deliveryPartner?.name ||
                'We will soon assign you delivery partner'}
            </CustomText>
            {currentOrder?.deliveryPartner && (
              <CustomText variant="h7" fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomText>
            )}
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner?.phone
                ? 'For delivery instructions you can contact here'
                : msg}
            </CustomText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
        <OrderSummary order={currentOrder} />

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
    </View>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 80,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
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
