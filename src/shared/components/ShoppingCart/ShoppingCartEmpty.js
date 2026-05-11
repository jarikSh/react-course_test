import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ButtonMain from 'shared/components/ButtonMain';
import emptyBox from 'assets/images/empty-box.png';

import styles from './ShoppingCart.module.scss';

function ShoppingCartEmpty({ closeCartHandler }) {
  return (
    <div className={styles.cart}>
      <div className={styles.header}>Корзина</div>
      <div className={styles.emptyCart}>
        <img src={emptyBox} alt="empty cart" />
        <h3>Корзина пустая</h3>
        <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
        <ButtonMain
          label="Вернуться назад"
          startIcon={<ArrowBackIcon />}
          onClick={closeCartHandler}
        />
      </div>
    </div>
  );
}

ShoppingCartEmpty.propTypes = {
  closeCartHandler: PropTypes.func.isRequired
};

export default ShoppingCartEmpty;
