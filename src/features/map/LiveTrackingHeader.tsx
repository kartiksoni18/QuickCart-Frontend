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
import {navigate} from '@utils/NavigationUtils';
import {useAuthStore} from '@state/authStore';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
interface LiveTrackingHeaderProps {
  title: string;
  secondTitle: string;
  type: 'Customer' | 'Delivery';
}
const LiveTrackingHeader: FC<LiveTrackingHeaderProps> = ({
  title,
  secondTitle,
  type,
}) => {
  const isCustomer = type === 'Customer';
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const handleBackPress = () => {
    if (isCustomer) {
      navigate('ProductDashboard');
      if (currentOrder?.status === 'delivered') {
        setCurrentOrder(null);
      }
      return;
    }

    navigate('DeliveryDashboard');
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
          <Icon
            name="chevron-back"
            color={isCustomer ? '#fff' : '#000'}
            size={RFValue(16)}
          />
        </TouchableOpacity>
        <CustomText
          variant="h6"
          style={{color: isCustomer ? '#fff' : '#000'}}
          fontFamily={Fonts.Medium}>
          {title}
        </CustomText>
        <CustomText
          variant="h4"
          style={{color: isCustomer ? '#fff' : '#000'}}
          fontFamily={Fonts.SemiBold}>
          {secondTitle}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default LiveTrackingHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
});
