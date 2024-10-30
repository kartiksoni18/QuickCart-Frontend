import {View, Text, Alert, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {deliveryPartnerLogin} from '@services/authService';
import {screenHeight} from '@utils/Scaling';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import CustomTextInput from '@components/ui/CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
import {useAuthStore} from '@state/authStore';

const DeliveryPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleRightIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryPartnerLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      console.log('error', error);
      Alert.alert('Login failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              loop
              autoPlay
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delievery Partner Portal
          </CustomText>
          <CustomText
            style={styles.text}
            variant="h6"
            fontFamily={Fonts.SemiBold}>
            Faster than Flash ⚡️
          </CustomText>
          <CustomTextInput
            value={email}
            onChangeText={setEmail}
            left={
              <Icon
                name="mail"
                size={RFValue(18)}
                color={Colors.primary}
                style={{marginLeft: 10}}
              />
            }
            placeholder="Email"
          />
          <CustomTextInput
            value={password}
            onChangeText={setPassword}
            left={
              <Icon
                name="key-sharp"
                size={RFValue(18)}
                color={Colors.primary}
                style={{marginLeft: 10}}
              />
            }
            placeholder="Password"
            secureTextEntry={showPassword}
            onRightIconClick={handleRightIconClick}
            right
            iconName={showPassword ? 'eye-off' : 'eye'}
          />
          <CustomButton
            loading={loading}
            onPress={handleLogin}
            title="Continue"
            disabled={!email?.length || password?.length < 6}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    width: '100%',
    height: screenHeight * 0.12,
  },
});

export default DeliveryPartnerLogin;
