import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '../ui/CustomText';
import {goBack} from '@utils/NavigationUtils';
interface CustomHeaderProps {
  title: string;
  search?: boolean;
}
const CustomHeader: FC<CustomHeaderProps> = ({title, search = false}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="chevron-back" size={RFValue(16)} color={Colors.text} />
        </TouchableOpacity>
        <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
        <View>
          {search && (
            <Icon name="search" size={RFValue(16)} color={Colors.text} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.border,
  },
});
