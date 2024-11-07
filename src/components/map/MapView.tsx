import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {customMapStyle} from '@utils/CustomMap';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_API} from '@services/config';
import Markers from './Markers';
import {getPoints} from './getPoints';
import {Colors} from '@utils/Constants';

const MapViewComponent = ({
  hasAccepted,
  setMapRef,
  orderStatus,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  hasPickedUp,
}: any) => {
  console.log('here', deliveryPersonLocation, deliveryLocation);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        ref={setMapRef}
        // provider="google"
        initialRegion={{
          latitude: 37.7749, // Use default or a known coordinate
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // camera={camera}
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
          orderStatus={orderStatus}
        />

        {!hasPickedUp && deliveryLocation && pickupLocation && (
          <Polyline
            coordinates={getPoints([pickupLocation, deliveryLocation])}
            strokeColor={Colors.text}
            strokeWidth={2}
            geodesic={true}
            lineDashPattern={[12, 10]}
          />
        )}

        {/* {hasPickedUp && deliveryLocation && deliveryPersonLocation (
          <Polyline
            coordinates={getPoints([deliveryLocation, deliveryPersonLocation])}
            strokeColor={Colors.text}
            strokeWidth={2}
            geodesic={true}
            lineDashPattern={[12, 10]}
          />
        )} */}
      </MapView>
    </View>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
