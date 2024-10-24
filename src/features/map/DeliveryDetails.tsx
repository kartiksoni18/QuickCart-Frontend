import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

const DeliveryDetails: FC<{details: any}> = ({details}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="bike-fast" size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Your delivery details
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Details of your current order
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon
            name="map-marker-outline"
            size={RFValue(20)}
            color={Colors.disabled}
          />
        </View>
        <View style={{width: '80%'}}>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Delivery at Home
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Regular} numberOfLines={2}>
            {details?.address || '-------'}
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon
            name="phone-outline"
            size={RFValue(20)}
            color={Colors.disabled}
          />
        </View>
        <View style={{width: '80%'}}>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            {details?.name || '--'} {details?.phone || 'XXXXXXXX'}
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Regular} numberOfLines={2}>
            Receiver's contact no.
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 15,
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
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 100,
  },
});
