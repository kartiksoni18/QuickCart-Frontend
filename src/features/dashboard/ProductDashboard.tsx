import {StyleSheet, Text, View, Animated as RNAnimated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useAuthStore} from '@state/authStore';
import NoticeAnimation from '@components/ui/NoticeAnimation';
import {noticeHeight} from '@utils/Scaling';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';

const NOTICE_HEIGHT = -(noticeHeight + 12);
const ProductDashboard = () => {
  const {user} = useAuthStore();
  console.log('user', user);
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();

    const timeoutId = setTimeout(() => {
      slideUp();
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <CustomSafeAreaView>
          <View>
            <Text>Product Daskboard</Text>
          </View>
        </CustomSafeAreaView>
      </>
    </NoticeAnimation>
  );
};

export default ProductDashboard;

const styles = StyleSheet.create({});
