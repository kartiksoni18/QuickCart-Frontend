import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '@utils/Scaling';
import ScalePress from './ScalePress';

interface AdCarouselProps {
  adData: any;
}
const AdCarousel: FC<AdCarouselProps> = ({adData}) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenHeight * 0.25,
  };
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
      }}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        autoPlay
        snapEnabled
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({item}: any) => {
          return (
            <ScalePress style={styles.imgContainer}>
              <Image source={item} style={styles.img} resizeMode="cover" />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

export default AdCarousel;

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
