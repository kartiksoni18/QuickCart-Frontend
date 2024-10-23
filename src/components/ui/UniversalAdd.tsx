import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useCartStore} from '@state/cartState';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
interface UniversalAddProps {
  item: any;
}
const UniversalAdd: FC<UniversalAddProps> = ({item}) => {
  const count = useCartStore(state => state.getItemCount(item?._id));
  const {addItem, removeItem} = useCartStore();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? '#fff' : Colors.secondary},
      ]}>
      {count === 0 ? (
        <TouchableOpacity onPress={() => addItem(item)} style={styles.add}>
          <CustomText
            style={styles.addText}
            fontFamily={Fonts.Medium}
            variant="h8">
            ADD
          </CustomText>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => removeItem(item?._id)}>
            <Icon name="minus" color="#fff" size={RFValue(13)} />
          </TouchableOpacity>
          <CustomText
            variant="h6"
            style={styles.text}
            fontFamily={Fonts.Medium}>
            {count}
          </CustomText>
          <TouchableOpacity onPress={() => addItem(item)}>
            <Icon name="plus" color="#fff" size={RFValue(13)} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 65,
    borderRadius: 8,
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  addText: {
    color: Colors.primary,
  },
  counterContainer: {
    backgroundColor: Colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
  },
});
