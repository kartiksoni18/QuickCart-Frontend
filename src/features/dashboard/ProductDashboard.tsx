import {
  StyleSheet,
  Text,
  View,
  Animated as RNAnimated,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useAuthStore} from '@state/authStore';
import NoticeAnimation from '@components/ui/NoticeAnimation';
import {noticeHeight, screenHeight} from '@utils/Scaling';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import Visuals from '@components/ui/Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from '@components/ui/AnimatedHeader';
import StickySearchBar from '@components/ui/StickySearchBar';
import Content from '@components/ui/Content';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const NOTICE_HEIGHT = -(noticeHeight + 12);
const ProductDashboard = () => {
  const {user} = useAuthStore();
  const {scrollY, expand} = useCollapsibleContext();
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;

    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 500});

    previousScroll.current = scrollY.value;

    return {opacity, transform: [{translateY}]};
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();

    const timeoutId = setTimeout(() => {
      slideUp();
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        {/* back to top */}
        <Animated.View style={[styles.backToTopIcon, backToTopStyle]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}>
            <Icon
              name="arrow-up-circle-outline"
              size={RFValue(12)}
              color="white"
            />
            <CustomText
              variant="h9"
              fontFamily={Fonts.SemiBold}
              style={{color: 'white'}}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>
        {/* for collapsable container */}
        <CollapsibleContainer style={styles.panelContainer}>
          {/* for Header */}
          <CollapsibleHeaderContainer
            containerStyle={{
              backgroundColor: 'transparent',
            }}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 2500);

                return () => clearTimeout(timeoutId);
              }}
            />
            {/* this will be sticky search bar */}
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />

            <View
              style={{
                backgroundColor: '#f8f8f8',
                padding: 20,
                pointerEvents: 'auto',
              }}>
              <CustomText
                fontSize={RFValue(25)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                The Eleventh-Hour Escape 🏂
              </CustomText>
              <CustomText
                fontSize={RFValue(18)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, marginTop: 10}}>
                Developed by Kartik 👨🏻‍💻
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};
const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  backToTopIcon: {
    position: 'absolute',
    backgroundColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
    borderRadius: 15,
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    zIndex: 999,
  },
});

export default withCollapsibleContext(ProductDashboard);
