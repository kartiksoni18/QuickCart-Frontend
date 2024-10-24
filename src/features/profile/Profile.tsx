import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {useCartStore} from '@state/cartState';
import {fetchCustomerOrders} from '@services/orderService';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import OrderItem from './OrderItem';
import CustomHeader from '@components/global/CustomHeader';
import {storage, tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';

const Profile = () => {
  const [orders, setOrders] = useState();
  const {logout, user} = useAuthStore();
  const {clearCart} = useCartStore();

  const fetchOrders = async () => {
    try {
      const data = await fetchCustomerOrders(user?._id);

      setOrders(data);
    } catch (error) {
      console.log('Failed to fetch customer orders', error);
    }
  };

  const handleLogOut = () => {
    clearCart();
    logout();
    tokenStorage.clearAll();
    storage.clearAll();
    resetAndNavigate('CustomerLogin');
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
          Your account
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomText>

        <WalletSection />

        <CustomText
          variant="h7"
          fontFamily={Fonts.SemiBold}
          style={styles.informativeText}>
          YOUR INFORMATION
        </CustomText>

        <ActionButton
          icon="book-outline"
          label="Address book"
          onPress={() => {}}
        />
        <ActionButton
          icon="information-circle-outline"
          label="About Us"
          onPress={() => {}}
        />
        <ActionButton
          icon="log-out-outline"
          label="Log out"
          onPress={handleLogOut}
        />

        <CustomText
          variant="h7"
          fontFamily={Fonts.SemiBold}
          style={styles.pastText}>
          PAST ORDERS
        </CustomText>
      </View>
    );
  };

  const renderOrders = ({item, index}: any) => {
    return <OrderItem item={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item: any) => item?.orderId}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
});
