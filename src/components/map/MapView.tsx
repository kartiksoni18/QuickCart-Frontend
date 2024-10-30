import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import {customMapStyle} from '@utils/CustomMap';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_API} from '@services/config';
import Markers from './Markers';

const MapViewComponent = ({
  mapRef,
  hasAccepted,
  setMapRef,
  camera,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  hasPickedUp,
}: any) => {
  console.log(deliveryPersonLocation, hasAccepted, hasPickedUp);
  return (
    <MapView
      ref={setMapRef}
      style={{flex: 1}}
      provider="google"
      camera={camera}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
      userLocationCalloutEnabled={true}
      userLocationPriority="high"
      showsTraffic={false}
      pitchEnabled={false}
      followsUserLocation={true}
      showsCompass={true}
      showsBuildings={false}
      showsIndoorLevelPicker={false}
      showsIndoors={false}
      showsScale={false}>
      {deliveryPersonLocation && (hasAccepted || hasPickedUp) && (
        <MapViewDirections
          origin={deliveryPersonLocation}
          destination={hasAccepted ? pickupLocation : deliveryLocation}
          precision="high"
          apikey={GOOGLE_MAP_API}
          strokeColor="#2871F2"
          strokeWidth={5}
          onError={err => console.log('Error in MapViewDirections', err)}
        />
      )}

      <Markers
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
        pickupLocation={pickupLocation}
      />
    </MapView>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
