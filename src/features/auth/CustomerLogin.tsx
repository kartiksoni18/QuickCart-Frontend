import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomTextInput from '@components/ui/CustomTextInput';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import LinearGradient from 'react-native-linear-gradient';
import {customerLogin} from '@services/authService';
import {useAuthStore} from '@state/authStore';

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useAuthStore();
  const bottomColors = [...lightColors].reverse();
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const userData = {phone: phoneNumber, ...user};
      await customerLogin(userData);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      console.log('error', error);
      Alert.alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  return (
    <View className="flex-1">
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}
            style={{transform: [{translateY: animatedValue}]}}>
            <LinearGradient colors={bottomColors} style={styles.gradient} />
            <View style={styles.content}>
              <Image
                source={require('@assets/images/logo.png')}
                style={styles.logo}
              />
              <CustomText
                variant="h3"
                fontFamily={Fonts.Bold}
                style={styles.text}>
                The Eleventh-Hour Escape
              </CustomText>
              <CustomText
                variant="h6"
                fontFamily={Fonts.SemiBold}
                style={styles.text}>
                Log in or sign up
              </CustomText>

              <CustomTextInput
                onChangeText={setPhoneNumber}
                onRightIconClick={() => setPhoneNumber('')}
                value={phoneNumber}
                left={
                  <CustomText
                    variant="h7"
                    style={styles.phoneText}
                    fontFamily={Fonts.SemiBold}>
                    +91
                  </CustomText>
                }
                right
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter your mobile number"
              />
              <CustomButton
                title="Continue"
                onPress={handleAuth}
                disabled={phoneNumber.length != 10}
                loading={loading}
              />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>

        <View style={styles.footer}>
          <CustomText variant="h9" fontFamily={Fonts.Medium}>
            By continuing, you agree to our Terms & Conditions and Privacy
            Policy
          </CustomText>
        </View>
      </CustomSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    marginTop: 5,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 50,
    height: 35,
    borderRadius: 20,
    marginVertical: 20,
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 20,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
});
export default CustomerLogin;
