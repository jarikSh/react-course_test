import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formatCurrency } from 'shared/utilities/formatCurrency';
import removeFromCart from 'assets/images/remove-from-cart.svg';
import buttons from 'styles/buttons.module.scss';

import styles from './ShoppingCartItem.module.scss';

function ShoppingCartItem({ item, removeItemFromCart }) {
  const { name, price, image } = item;
  return (
    <div className={styles.cartItem}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.title}>{name}</div>
      <div className={styles.price}>{formatCurrency(price)} </div>
      <button
        className={classNames(buttons.actionButton, styles.removeButton)}
        onClick={() => removeItemFromCart(item.productId)}>
        <img src={removeFromCart} alt="Remove from cart" />
      </button>
    </div>
  );
}

ShoppingCartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }),
  removeItemFromCart: PropTypes.func.isRequired
};

export default ShoppingCartItem;
