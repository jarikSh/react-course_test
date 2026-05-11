import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ButtonMain from 'shared/components/ButtonMain';
import ShoppingCartItem from 'shared/components/ShoppingCartItem';
import { SHOPPING_CART_STATE } from 'shared/reducers/shoppingCartReducer';
import { formatCurrency } from 'shared/utilities/formatCurrency';

import styles from './ShoppingCart.module.scss';

function ShoppingCartItems({ cartItems, cartTotal, setCartState, removeItemFromCart }) {
  const items = cartItems.map((item) => {
    const cartObject = {
      item,
      removeItemFromCart
    };
    return <ShoppingCartItem key={item.id} {...cartObject} />;
  });

  return (
    <div className={styles.cart}>
      <div className={styles.header}>Корзина</div>
      <div className={styles.cartContent}>{items}</div>
      <div className={styles.footer}>
        <div className={styles.cartSummary}>
          <span>Итого:</span>
          <div>{formatCurrency(cartTotal)}</div>
        </div>
        <div className={styles.cartSummary}>
          <span>Налог 5%:</span>
          <div>{formatCurrency(cartTotal * 0.05)}</div>
        </div>
        <ButtonMain
          label="Перейти к оформлению"
          endIcon={<ArrowForwardIcon />}
          onClick={() => setCartState(SHOPPING_CART_STATE.CART_SHIPPING)}
        />
      </div>
    </div>
  );
}
ShoppingCartItems.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      productId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  cartTotal: PropTypes.number.isRequired,
  setCartState: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired
};

export default ShoppingCartItems;
