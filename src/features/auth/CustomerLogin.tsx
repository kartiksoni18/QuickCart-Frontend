import {View, Text, Animated, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {resetAndNavigate} from '@utils/NavigationUtils';

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryPartnerLogin');
      }
    }
  };
  return (
    <View className="flex-1">
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}></Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default CustomerLogin;
