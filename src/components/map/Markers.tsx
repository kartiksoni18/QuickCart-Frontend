import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Marker} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthStore} from '@state/authStore';

const Markers = ({
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  orderStatus,
}: any) => {
  const {user} = useAuthStore();
  console.log('hsfh', orderStatus, deliveryPersonLocation);
  return (
    <>
      {deliveryLocation && (
        <Marker
          image={require('@assets/icons/my_pin.png')}
          coordinate={deliveryLocation}
          style={{height: RFValue(15), width: RFValue(15)}}
        />
      )}

      {pickupLocation && (
        <Marker
          image={require('@assets/icons/store.png')}
          coordinate={pickupLocation}
          style={{height: RFValue(20), width: RFValue(20)}}
        />
      )}

      {deliveryPersonLocation &&
        user?.role != 'customer' &&
        orderStatus === 'arriving' && (
          <Marker
            image={require('@assets/icons/delivery.png')}
            coordinate={deliveryPersonLocation}
            style={{
              position: 'absolute',
              zIndex: 99,
              height: RFValue(20),
              width: RFValue(20),
            }}
          />
        )}
    </>
  );
};

export default Markers;

const styles = StyleSheet.create({});
