import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
interface ArrowButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  price?: number;
}
const ArrowButton: FC<ArrowButtonProps> = ({
  title,
  onPress,
  loading,
  price,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {justifyContent: price != 0 ? 'space-between' : 'center'},
      ]}>
      {price != 0 && price && (
        <View>
          <CustomText
            variant="h7"
            style={{color: 'white'}}
            fontFamily={Fonts.SemiBold}>
            ₹{price + 34}.0
          </CustomText>
          <CustomText
            variant="h7"
            style={{color: 'white'}}
            fontFamily={Fonts.Regular}>
            TOTAL
          </CustomText>
        </View>
      )}

      <View style={styles.flexRow}>
        <CustomText
          style={{color: 'white'}}
          variant="h6"
          fontFamily={Fonts.Regular}>
          {title}
        </CustomText>
        {loading ? (
          <ActivityIndicator
            color="white"
            style={{marginHorizontal: 5}}
            size="small"
          />
        ) : (
          <Icon name="arrow-right" size={RFValue(25)} color="#fff" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({
  btn: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
  },
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
