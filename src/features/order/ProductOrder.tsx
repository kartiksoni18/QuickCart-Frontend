import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '@components/global/CustomHeader';
import {Colors, Fonts} from '@utils/Constants';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useCartStore} from '@state/cartState';
import BillDetails from './BillDetails';
import {hocStyles} from '@styles/GlobalStyles';
import {useAuthStore} from '@state/authStore';
import ArrowButton from '@components/ui/ArrowButton';
import {navigate} from '@utils/NavigationUtils';
import {createOrder} from '@services/orderService';

const ProductOrder = () => {
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const totalItemPrice = getTotalPrice();
  const {user, currentOrder, setCurrentOrder} = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      if (currentOrder !== null) {
        Alert.alert('Let your current order be delivered first');
        return;
      }

      const formattedData = cart.map(item => ({
        id: item._id,
        item: item._id,
        count: item.count,
      }));

      if (formattedData.length === 0) {
        Alert.alert('Add items to place order');
        return;
      }
      setLoading(true);

      const data = await createOrder(formattedData, totalItemPrice);
      console.log('data', data);

      if (data != null) {
        setCurrentOrder(data);
        clearCart();
        navigate('OrderSuccess', {...data});
      } else {
        Alert.alert('Failed to place order');
        return;
      }
    } catch (error) {
      Alert.alert('Error Placing Order');
      console.log('Error placing order', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/coupon.png')}
              style={{width: 25, height: 25}}
            />
            <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={styles.cancelText}>
              Order cannot be cancelled once packed for delivery, In case of
              unexpected delays, a refund will be provided, if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('@assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: '75%'}}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Delivering to Home
                </CustomText>
                <CustomText
                  variant="h8"
                  fontFamily={Fonts.SemiBold}
                  style={{opacity: 0.6}}>
                  {user?.address || 'Knowhere Somewhere'}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity>
              <CustomText
                variant="h7"
                style={{color: Colors.primary, marginRight: 5}}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentGateway}>
            <View style={{width: '30%'}}>
              <CustomText fontFamily={Fonts.Regular} variant="h6">
                💵 PAY USING
              </CustomText>
              <CustomText
                fontFamily={Fonts.Regular}
                variant="h8"
                style={{marginTop: 2}}>
                Cash on Delivery
              </CustomText>
            </View>
            <View style={{width: '70%'}}>
              <ArrowButton
                loading={loading}
                onPress={handlePlaceOrder}
                price={totalItemPrice}
                title="Place Order"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingBottom: 250,
    padding: 10,
  },
  flexRowBetween: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 5,
  },
});
