import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
interface TabBarProps {
  selectedTab: 'available' | 'delivered';
  onTabChange: (tab: 'available' | 'delivered') => void;
}
const TabBar: FC<TabBarProps> = ({selectedTab, onTabChange}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        onPress={() => onTabChange('available')}
        style={[styles.tab, selectedTab === 'available' && styles.activeTab]}>
        <CustomText
          variant="h7"
          fontFamily={Fonts.Medium}
          style={[
            styles.tabText,
            selectedTab === 'available'
              ? styles.activeTabText
              : styles.inactiveTabText,
          ]}>
          Available
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTabChange('delivered')}
        style={[styles.tab, selectedTab === 'delivered' && styles.activeTab]}>
        <CustomText
          variant="h7"
          fontFamily={Fonts.Medium}
          style={[
            styles.tabText,
            selectedTab === 'delivered'
              ? styles.activeTabText
              : styles.inactiveTabText,
          ]}>
          Delivered
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    width: '38%',
    margin: 10,
    borderColor: '#000',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#000',
  },
});
