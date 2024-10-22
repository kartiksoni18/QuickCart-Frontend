import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from './CustomText';
import {Colors, Fonts} from '@utils/Constants';
interface SidebarProps {
  categories: any;
  selectedCategory: any;
  onCategoryPress: (category: any) => void;
}
const Sidebar: FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories.map(() => useSharedValue(0));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateY: indicatorPosition.value}],
  }));

  useEffect(() => {
    let targetIndex = -1;

    categories?.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });

      if (isSelected) targetIndex = index;
    });

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {duration: 300});
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        });
      });
    }
  }, [selectedCategory]);
  return (
    <View style={styles.sideBar}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        <Animated.View>
          {categories?.map((category: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
            }));

            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryContainer}
                onPress={() => onCategoryPress(category)}>
                <View
                  style={[
                    styles.imgContainer,
                    selectedCategory?._id === category?._id &&
                      styles.selectedImageContainer,
                  ]}>
                  <Animated.Image
                    source={{uri: category?.image}}
                    style={[styles.img, animatedStyle]}
                  />
                </View>
                <CustomText
                  style={styles.text}
                  variant="h8"
                  fontFamily={Fonts.SemiBold}>
                  {category?.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryContainer: {
    height: 100,
    padding: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imgContainer: {
    borderRadius: 100,
    width: '75%',
    height: '50%',
    backgroundColor: '#f3f4f7',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
  },
  selectedImageContainer: {
    backgroundColor: Colors.primary,
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
