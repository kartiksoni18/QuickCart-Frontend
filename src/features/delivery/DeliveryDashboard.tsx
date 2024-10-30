import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import TabBar from '@components/delivery/TabBar';
import {fetchOrders} from '@services/orderService';
import CustomText from '@components/ui/CustomText';
import OrderItem from '@components/delivery/OrderItem';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setData([]);
      setRefreshing(true);
      setLoading(true);

      console.log('user', user);

      const data = await fetchOrders(selectedTab, user?._id, user?.branch);

      // console.log('data', JSON.stringify(data));
      setData(data);
    } catch (error) {
      console.log('error fetching orders', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const renderOrderItem = ({item, index}: any) => {
    return <OrderItem item={item} index={index} />;
  };
  useEffect(() => {
    fetchData();
  }, [selectedTab]);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size="small" />
                </View>
              );
            }

            return (
              <View style={styles.center}>
                <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
                  No Orders found!
                </CustomText>
              </View>
            );
          }}
          renderItem={renderOrderItem}
          keyExtractor={item => item?.orderId}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

export default DeliveryDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5C5C',
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    padding: 6,
  },
  flatListContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    alignSelf: 'center',
  },
});
