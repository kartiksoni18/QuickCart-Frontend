import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import CustomText from './CustomText';
import {Colors, Fonts} from '@utils/Constants';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}
const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.primary,
        },
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <CustomText
          variant="h6"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
});
