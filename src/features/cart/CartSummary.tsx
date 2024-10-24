import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@utils/NavigationUtils';
interface CartSummaryProps {
  cartCount: number;
  cartImage?: string;
}
const CartSummary: FC<CartSummaryProps> = ({cartCount, cartImage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRowGap}>
        <Image
          source={
            cartImage === null
              ? require('@assets/icons/bucket.png')
              : {uri: cartImage}
          }
          style={styles.image}
        />
        <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
          {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
        </CustomText>
        <Icon
          name="arrow-drop-up"
          color={Colors.secondary}
          size={RFValue(25)}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => navigate('ProductOrder')}>
        <CustomText style={styles.btnText} fontFamily={Fonts.SemiBold}>
          Next
        </CustomText>
        <Icon name="arrow-right" color="#fff" size={RFValue(25)} />
      </TouchableOpacity>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenHeight * 0.03,
    paddingTop: screenHeight * 0.014,
  },
  flexRowGap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: screenWidth * 0.03,
  },
  image: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.025,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: screenWidth * 0.01,
    paddingHorizontal: screenWidth * 0.02,
    borderRadius: screenWidth * 0.025,
    backgroundColor: Colors.primary,
  },
  btnText: {
    marginLeft: screenWidth * 0.02,
    color: '#fff',
  },
});