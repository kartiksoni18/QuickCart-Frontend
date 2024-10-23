import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
interface ProductItemProps {
  item: any;
  index: number;
}
const ProductItem: FC<ProductItemProps> = ({item, index}) => {
  const isSecondColumn = index % 2 !== 0;
  return (
    <View style={[styles.container, {marginRight: isSecondColumn ? 10 : 0}]}>
      <View style={styles.imgContainer}>
        <Image source={{uri: item?.image}} style={styles.img} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.clockIcon}
          />
          <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
            8 MINS
          </CustomText>
        </View>
        <CustomText
          variant="h8"
          numberOfLines={2}
          style={{marginVertical: 5, alignSelf: 'center'}}
          fontFamily={Fonts.Medium}>
          {item?.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              ₹{item?.price}
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={{opacity: 0.7, textDecorationLine: 'line-through'}}>
              ₹{item?.discountPrice}
            </CustomText>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginLeft: '2.5%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imgContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  img: {
    height: '100%',
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  flexRow: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.secondary,
    alignSelf: 'center',
  },
  clockIcon: {
    height: 15,
    width: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 'auto',
  },
});
