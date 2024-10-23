import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import {useCartStore} from '@state/cartState';
import OrderItem from './OrderItem';

const OrderList = () => {
  const cart = useCartStore(state => state.cart);
  const itemCount = cart?.reduce((acc, item) => acc + item?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.img}
          />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Delivery in 9 minutes
          </CustomText>
          <CustomText
            variant="h8"
            style={{opacity: 0.5}}
            fontFamily={Fonts.SemiBold}>
            Shipment of {itemCount || 0} item
          </CustomText>
        </View>
      </View>

      {cart.length > 0 &&
        cart.map(item => <OrderItem item={item} key={item?._id} />)}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  img: {
    height: 30,
    width: 30,
  },
});
