import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '@components/global/CustomHeader';
import {Colors, Fonts} from '@utils/Constants';
import Sidebar from '@components/ui/Sidebar';
import {
  getAllCategories,
  getProductsByCategoryId,
} from '@services/productService';
import ProductList from './ProductList';
import CustomText from '@components/ui/CustomText';

const ProductCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getAllCategories();
      if (data && data?.length > 0) {
        setCategories(data);
        setSelectedCategory(data[0]);
      }
    } catch (error) {
      console.log('Error fetching categories', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchProductByCategoryId = async (categoryId: string) => {
    try {
      setProductsLoading(true);
      const data = await getProductsByCategoryId(categoryId);
      setProducts(data ?? []);
    } catch (error) {
      console.log('Error fetching products', error);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory?._id) {
      fetchProductByCategoryId(selectedCategory?._id);
    }
  }, [selectedCategory?._id]);
  return (
    <View style={styles.container}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator color={Colors.border} size="small" />
        ) : (
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: any) => setSelectedCategory(category)}
          />
        )}
        {productsLoading ? (
          <ActivityIndicator color={Colors.border} size="small" />
        ) : !products?.length ? (
          <View
            style={{
              backgroundColor: Colors.backgroundSecondary,
              width: '75%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              variant="h6"
              fontFamily={Fonts.Medium}
              style={{marginTop: -10}}>
              No products available
            </CustomText>
          </View>
        ) : (
          <ProductList data={products} />
        )}
      </View>
    </View>
  );
};

export default ProductCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
