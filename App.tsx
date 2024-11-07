import 'react-native-gesture-handler';
import React from 'react';
import Navigation from '@navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StripeProvider
        publishableKey={
          'pk_test_51I8JqzCkjw2NURwjpldjMmkq9609eFWEiyT6Hv6E2yV0FAagKzh45EbdlXDkjPU13P1hrgSpunlvonkvz0Pm59My00X8Wg79fm'
        }>
        <Navigation />
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
