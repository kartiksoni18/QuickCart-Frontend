import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import ScalePress from './ScalePress';
import CustomText from './CustomText';
import {navigate} from '@utils/NavigationUtils';
import {Fonts} from '@utils/Constants';

interface CategoryContainerProps {
  categories: any;
}
const CategoryContainer: FC<CategoryContainerProps> = ({categories}) => {
  const renderItems = useMemo(() => {
    return (
      <View style={styles.container}>
        {categories?.map((item: any, index: number) => {
          return (
            <ScalePress
              onPress={() => navigate('ProductCategories')}
              key={index}
              style={styles.itemContainer}>
              <View style={styles.imgContainer}>
                <Image source={item?.image} style={styles.img} />
              </View>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{textAlign: 'center'}}>
                {item?.name}
              </CustomText>
            </ScalePress>
          );
        })}
      </View>
    );
  }, []);

  return <View>{renderItems}</View>;
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemContainer: {
    width: '23%',
    marginBottom: 10,
  },
  imgContainer: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    marginBottom: 8,
    backgroundColor: '#e5f3f3',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
