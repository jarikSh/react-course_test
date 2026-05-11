import { useShoppingCart } from 'shared/context/ShoppingCartContext';
import { SHOPPING_CART_STATE } from 'shared/reducers/shoppingCartReducer';

import ShoppingCartEmpty from './ShoppingCartEmpty';
import ShoppingCartItems from './ShoppingCartItems';
import ShoppingCartOrderDetails from './ShoppingCartOrderDetails';
import ShoppingCartShipping from './ShoppingCartShipping';

function ShoppingCart() {
  const {
    cartItems,
    cartTotal,
    setIsCartOpen,
    removeItemFromCart,
    checkout,
    cartState,
    setCartState
  } = useShoppingCart();

  switch (cartState) {
    case SHOPPING_CART_STATE.CART_PRODUCTS: {
      if (cartItems.length > 0) {
        return (
          <ShoppingCartItems
            cartItems={cartItems}
            cartTotal={cartTotal}
            setCartState={setCartState}
            removeItemFromCart={removeItemFromCart}
          />
        );
      } else {
        return <ShoppingCartEmpty closeCartHandler={() => setIsCartOpen(false)} />;
      }
    }
    case SHOPPING_CART_STATE.CART_SHIPPING:
    case SHOPPING_CART_STATE.CART_PROCESSING:
      return (
        <ShoppingCartShipping cartTotal={cartTotal} cartState={cartState} checkout={checkout} />
      );
    case SHOPPING_CART_STATE.CART_DONE:
    case SHOPPING_CART_STATE.CART_ERROR:
      return (
        <ShoppingCartOrderDetails
          closeCartHandler={() => setIsCartOpen(false)}
          cartState={cartState}
        />
      );
    default:
      return null;
  }
}

export default ShoppingCart;
