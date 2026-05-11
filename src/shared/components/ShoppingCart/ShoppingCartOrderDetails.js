import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import classNames from 'classnames';

import ButtonMain from 'shared/components/ButtonMain';
import { SHOPPING_CART_STATE } from 'shared/reducers/shoppingCartReducer';
import orderCompleted from 'assets/images/order-completed.jpg';

import styles from './ShoppingCart.module.scss';

function ShoppingCartOrderDetails({ closeCartHandler, cartState }) {
  const success = cartState === SHOPPING_CART_STATE.CART_DONE;

  return (
    <div className={styles.cart}>
      <div className={styles.header}>Оформление заказа</div>
      <div
        className={classNames(
          styles.emptyCart,
          success ? styles.orderCompleted : styles.orderFailed
        )}>
        <img src={orderCompleted} alt="order completed" />
        <h3>{success ? 'Заказ оформлен!' : 'Ошибка!'}</h3>
        <p>
          {success
            ? 'Ваш заказ #18 скоро будет передан курьерской доставке'
            : 'Произошла ошибка во время выполнения заказа'}
        </p>
        <ButtonMain
          label="Вернуться назад"
          startIcon={<ArrowBackIcon />}
          onClick={closeCartHandler}
        />
      </div>
    </div>
  );
}

ShoppingCartOrderDetails.propTypes = {
  closeCartHandler: PropTypes.func.isRequired,
  cartState: PropTypes.string.isRequired
};

export default ShoppingCartOrderDetails;
