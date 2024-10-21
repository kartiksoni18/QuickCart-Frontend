import {View, Text, ViewStyle, SafeAreaView} from 'react-native';
import React, {FC, ReactNode} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}
const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[{flex: 1, backgroundColor: '#fff'}, style]}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;
