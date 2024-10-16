import {View, Text, Image, StyleSheet} from 'react-native';
import React, {FC, useMemo} from 'react';
import {imageData} from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {screenHeight, screenWidth} from '@utils/Scaling';
const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        endPaddingWidth={0}
        duration={5000}
        style={{position: 'absolute', zIndex: -2}}>
        <View className="flex-1">
          {rows.map((row: any, rowIndex: number) => {
            return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{row: typeof imageData; rowIndex: number}> = ({
  row,
  rowIndex,
}) => {
  return (
    <View className="flex-row" key={rowIndex}>
      {row.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imageIndex}
            style={[
              styles.itemContainer,
              {transform: [{translateX: horizontalShift}]},
            ]}>
            <Image
              source={image}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenHeight * 0.12,
    backgroundColor: '#B9D9EB',
    borderRadius: 25,
  },
});
export default ProductSlider;
