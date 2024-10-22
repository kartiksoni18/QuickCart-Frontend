import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useMemo} from 'react';
import ProductItem from './ProductItem';
import {Colors} from '@utils/Constants';

interface ProductListProps {
  data: any;
}
const ProductList: FC<ProductListProps> = ({data}) => {
  const renderItem = useCallback(({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={styles.container}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.content}
      numColumns={2}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    width: '100%',
    paddingVertical: 10,
    paddingBottom: 20,
  },
});
