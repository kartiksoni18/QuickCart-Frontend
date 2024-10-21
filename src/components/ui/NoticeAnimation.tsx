import {StyleSheet, Text, View, Animated as RNAnimated} from 'react-native';
import React, {FC} from 'react';
import {noticeHeight} from '@utils/Scaling';
import Notice from './Notice';

interface NoticeAnimationProps {
  noticePosition: any;
  children: React.ReactNode;
}

const NOTICE_HEIGHT = -(noticeHeight + 12);

const NoticeAnimation: FC<NoticeAnimationProps> = ({
  noticePosition,
  children,
}) => {
  return (
    <View style={styles.container}>
      {/* this one is what will be come down */}
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </RNAnimated.View>

      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NOTICE_HEIGHT + 20],
            }),
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};

export default NoticeAnimation;

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
