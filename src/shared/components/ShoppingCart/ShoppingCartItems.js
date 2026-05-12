import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ButtonMain from 'shared/components/ButtonMain';
import ShoppingCartItem from 'shared/components/ShoppingCartItem';
import { SHOPPING_CART_STATE } from 'shared/reducers/shoppingCartReducer';
import { formatCurrency } from 'shared/utilities/formatCurrency';

import styles from './ShoppingCart.module.scss';
import ShoppingCartPromoCode from './ShoppingCartPromoCode';

function ShoppingCartItems({
  cartItems,
  cartTotal,
  discount,
  appliedPromoCode,
  setCartState,
  removeItemFromCart,
  applyPromoCode,
  removePromoCode
}) {
  const finalTotal = cartTotal - discount;

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
        <ShoppingCartPromoCode
          applyPromoCode={applyPromoCode}
          removePromoCode={removePromoCode}
          appliedPromoCode={appliedPromoCode}
        />
        <div className={styles.cartSummary}>
          <span>Итого:</span>
          <div>{formatCurrency(cartTotal)}</div>
        </div>
        {discount > 0 && (
          <div className={styles.cartSummary}>
            <span>Скидка:</span>
            <div className={styles.discountAmount}>−{formatCurrency(discount)}</div>
          </div>
        )}
        <div className={styles.cartSummary}>
          <span>Налог 5%:</span>
          <div>{formatCurrency(finalTotal * 0.05)}</div>
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
  discount: PropTypes.number.isRequired,
  appliedPromoCode: PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  setCartState: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  applyPromoCode: PropTypes.func.isRequired,
  removePromoCode: PropTypes.func.isRequired
};

ShoppingCartItems.defaultProps = {
  appliedPromoCode: null
};

export default ShoppingCartItems;
