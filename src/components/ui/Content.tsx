import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AdCarousel from './AdCarousel';
import {adData, categories} from '@utils/dummyData';
import CustomText from './CustomText';
import {Fonts} from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <AdCarousel adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer categories={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Bestsellers
      </CustomText>
      <CategoryContainer categories={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Snacks & Drinks
      </CustomText>
      <CategoryContainer categories={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Home & Lifestyle
      </CustomText>
      <CategoryContainer categories={categories} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
