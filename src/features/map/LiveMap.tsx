import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {screenHeight} from '@utils/Scaling';
import {Colors} from '@utils/Constants';
import {useMapRefStore} from '@state/mapStore';
import MapViewComponent from '@components/map/MapView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {handleFitToPath} from '@utils/mapUtils';

interface LiveMapProps {
  deliveryPersonLocation: any;
  pickupLocation?: any;
  deliveryLocation: any;
  hasPickedUp: any;
  hasAccepted: any;
  orderStatus?: string;
}
const LiveMap: FC<LiveMapProps> = ({
  deliveryLocation,
  deliveryPersonLocation,
  pickupLocation,
  hasAccepted,
  hasPickedUp,
  orderStatus,
}) => {
  const {mapRef, setMapRef} = useMapRefStore();

  const handleFitButton = () => {
    handleFitToPath(
      mapRef,
      deliveryPersonLocation,
      pickupLocation,
      deliveryLocation,
      hasPickedUp,
      hasAccepted,
    );
  };

  useEffect(() => {
    if (mapRef) {
      handleFitToPath(
        mapRef,
        deliveryPersonLocation,
        pickupLocation,
        deliveryLocation,
        hasPickedUp,
        hasAccepted,
      );
    }
  }, [mapRef, deliveryPersonLocation, hasAccepted, hasPickedUp]);
  return (
    <View style={styles.container}>
      <MapViewComponent
        orderStatus={orderStatus}
        mapRef={mapRef}
        setMapRef={setMapRef}
        hasAccepted={hasAccepted}
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
        pickupLocation={pickupLocation}
        hasPickedUp={hasPickedUp}
      />
      <TouchableOpacity style={styles.fitButton} onPress={handleFitButton}>
        <Icon name="target" size={RFValue(14)} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default LiveMap;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    flex: 1,
  },
  fitButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: Colors.border,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    borderRadius: 35,
  },
});
