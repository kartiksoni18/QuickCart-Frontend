import {
  StyleSheet,
  Text,
  View,
  Animated as RNAnimated,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {noticeHeight} from '@utils/Scaling';
import CustomText from './CustomText';
import {Colors, Fonts} from '@utils/Constants';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

const Notice = () => {
  return (
    <View style={{height: noticeHeight}}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <SafeAreaView>
            <CustomText
              style={{textAlign: 'center', color: Colors.primary}}
              variant="h6"
              fontFamily={Fonts.SemiBold}>
              It's raining near this location
            </CustomText>
            <CustomText
              style={{textAlign: 'center'}}
              variant="h7"
              fontFamily={Fonts.Medium}>
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      {/* using svg */}
      <Svg
        width="100%"
        height="35"
        fill="#ccd5e4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccd5e4',
    padding: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccd5e4',
  },
  wave: {
    width: '100%',
    transform: [{rotateX: '180deg'}],
  },
});
