import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from './CustomText';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => setIsFocused(true)} // so that the touchable opacity doesn't affect the input
    >
      <Icon name="search" color={Colors.text} size={RFValue(20)} />

      {/* Conditionally render TextInput or RollingBar */}
      {isFocused ? (
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          placeholderTextColor={Colors.text}
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={true} // to bring up the keyboard when focused
        />
      ) : (
        <RollingBar
          interval={3000}
          defaultStyle={false}
          customStyle={styles.textContainer}>
          <CustomText variant="h6" fontFamily={Fonts.Medium}>
            Search "sweets"
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Medium}>
            Search "milk"
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Medium}>
            Search "dal, aata, coke"
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Medium}>
            Search "chips"
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Medium}>
            Search "pooja thali"
          </CustomText>
        </RollingBar>
      )}

      <View style={styles.divider} />
      <Icon name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: '90%',
    paddingLeft: 10,
    height: 50,
  },
  textInput: {
    width: '80%',
    paddingLeft: 10,
    height: 50,
    fontSize: RFValue(12),
    color: Colors.text,
    fontFamily: Fonts.Medium,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
});
