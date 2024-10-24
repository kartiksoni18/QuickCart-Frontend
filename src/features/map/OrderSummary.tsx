import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useCartStore} from '@state/cartState';
import BillDetails from '@features/order/BillDetails';

const OrderSummary: FC<{order: any}> = ({order}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="shopping-outline"
            size={RFValue(20)}
            color={Colors.disabled}
          />
        </View>
        <View>
          <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
            Order Summary
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Order Id - #{order?.orderId}
          </CustomText>
        </View>
      </View>

      {order?.items?.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.flexRow}>
            <View style={styles.imgContainer}>
              <Image
                source={{uri: item?.item.image ?? item?.item.image}}
                style={styles.img}
              />
            </View>
            <View style={{width: '55%'}}>
              <CustomText
                numberOfLines={2}
                variant="h7"
                fontFamily={Fonts.Medium}>
                {item.item.name}
              </CustomText>
              <CustomText
                numberOfLines={2}
                variant="h7"
                fontFamily={Fonts.Medium}>
                {item.item.quantity}
              </CustomText>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <CustomText
                variant="h7"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                ₹{item.count * item.item.price}
              </CustomText>
              <CustomText
                variant="h7"
                fontFamily={Fonts.Medium}
                style={{alignSelf: 'flex-end', marginTop: 4}}>
                x{item.count}
              </CustomText>
            </View>
          </View>
        );
      })}
      <BillDetails totalItemPrice={order?.totalPrice} />
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 100,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
  img: {
    width: 40,
    height: 40,
  },
});
