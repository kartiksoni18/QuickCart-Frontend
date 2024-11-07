import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useStripe, CardField} from '@stripe/stripe-react-native';
import {makePayment} from '@services/paymentService';
import CustomButton from '@components/ui/CustomButton';
const PaymentScreen = () => {
  const {confirmPayment} = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      let amount = 1000;
      const response = await makePayment(amount);
      console.log('res', response);
      if (response) {
        const clientSecret = response.clientSecret;
        console.log('client', clientSecret);
        const {error, paymentIntent} = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
        });
        console.log('paymentIntent', paymentIntent);
        if (error) {
          console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
          console.log('Payment successful', paymentIntent);
        }
      }
    } catch (error) {
      console.log('error in handle payment', error);
      Alert.alert('Error in Payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242', // Stripe test card number
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '90%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <CustomButton
        title="Continue"
        onPress={handlePayment}
        loading={loading}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
