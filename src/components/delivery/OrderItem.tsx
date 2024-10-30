import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {formatToISOString} from '@utils/DateUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '@utils/NavigationUtils';
interface OrderItem {
  _id: string | number;
  item: any;
  count: number;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
  deliveryLocation: any;
  createdAt: string;
  status: 'confirmed' | 'completed';
}

const OrderItem: FC<{item: Order; index: number}> = ({item, index}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return '#28a745';
      case 'confirmed':
        return '#007bff';
      case 'delivered':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };
  return (
    <View style={styles.container} key={index}>
      <View style={styles.flexRowBetween}>
        <CustomText variant="h7" fontFamily={Fonts.Medium}>
          #{item?.orderId}
        </CustomText>
        <View style={styles.statusContainer}>
          <CustomText
            variant="h7"
            fontFamily={Fonts.Medium}
            style={[styles.statusText, {color: getStatusColor(item?.status)}]}>
            {item?.status}
          </CustomText>
        </View>
      </View>
      <View style={styles.itemContainer}>
        {item?.items?.slice(0, 2).map((i, idx) => {
          return (
            <CustomText key={idx} variant="h7" numberOfLines={1}>
              {i.count}x{i.item.name}
            </CustomText>
          );
        })}
      </View>

      <View style={[styles.flexRowBetween, styles.addressContainer]}>
        <View style={styles.addressTextContainer}>
          <CustomText variant="h8" numberOfLines={1}>
            {item?.deliveryLocation?.address}
          </CustomText>
          <CustomText
            style={styles.dateText}
            numberOfLines={1}
            fontFamily={Fonts.Medium}>
            {formatToISOString(item?.createdAt)}
          </CustomText>
        </View>
        <TouchableOpacity onPress={() => navigate('DeliveryMap', {...item})}>
          <Icon
            name="arrow-right-circle"
            size={RFValue(24)}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    padding: 10,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 15,
    backgroundColor: 'white',
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    textTransform: 'capitalize',
  },
  itemContainer: {
    width: '50%',
    marginTop: 10,
  },
  addressContainer: {
    marginTop: 10,
  },
  addressTextContainer: {
    width: '70%',
  },
  dateText: {
    marginTop: 2,
    fontSize: RFValue(8),
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
});
