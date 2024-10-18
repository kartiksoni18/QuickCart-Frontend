import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomTextInputProps {
  left?: React.ReactNode;
  onRightIconClick?: () => void;
  right?: boolean;
  iconName?:string
}
const CustomTextInput: FC<
  CustomTextInputProps & React.ComponentProps<typeof TextInput>
> = ({left, onRightIconClick, right = false, iconName ="close-circle-sharp",...props}) => {
  return (
    <View style={styles.flexRow}>
      {left ?? left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor="#ccc"
      />
      {props.value?.length != 0 && right && (
        <View style={styles.icon}>
          <TouchableOpacity onPress={onRightIconClick}>
            <Icon name={iconName} size={RFValue(14)} color="#ccc" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '10%',
    marginLeft: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
  inputContainer: {
    flex:1,
    marginLeft:10,
    // width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBottom: 15,
    height: '100%',
    color: Colors.text,
    // bottom: -1,
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
});
export default CustomTextInput;
