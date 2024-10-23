import {useCartStore} from '@state/cartState';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CartAnimationWrapper from './CartAnimationWrapper';
import CartSummary from './CartSummary';

const withCart = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithCartComponent: FC<P> = props => {
    const cart = useCartStore(state => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <CartAnimationWrapper cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart[0]?.item?.image || null}
          />
        </CartAnimationWrapper>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return WithCartComponent;
};

export default withCart;
