import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import classNames from 'classnames';
import { useForm, FormProvider } from 'react-hook-form';

import ButtonMain from 'shared/components/ButtonMain';
import FormCheckbox from 'shared/components/FormCheckbox';
import FormRadioGroup from 'shared/components/FormRadioGroup';
import FormTextField from 'shared/components/FormTextField';
import { SHOPPING_CART_STATE } from 'shared/reducers/shoppingCartReducer';
import { formatCurrency } from 'shared/utilities/formatCurrency';
import { shippingSchema } from 'shared/utilities/validation';

import styles from './ShoppingCart.module.scss';

const options = [
  {
    label: 'Оплата картой',
    value: 'card'
  },
  {
    label: 'Оплата наличными',
    value: 'cash'
  }
];

function ShoppingCartShipping({ cartTotal, discount, cartState, checkout }) {
  const finalTotal = cartTotal - discount;

  const methods = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      address: '',
      entrance: '',
      floor: '',
      apartment: '',
      sendEmail: false,
      payment: 'card'
    }
  });

  const onSubmitHandler = (data) => {
    checkout();
  };

  return (
    <div className={styles.cart}>
      <div className={styles.header}>Оформление заказа</div>

      <FormProvider {...methods}>
        <form
          className={styles.shippingForm}
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          noValidate>
          <div className={styles.shippingDetails}>
            <FormTextField name="name" label="Имя" required />
            <FormTextField name="email" label="Email" required />
            <FormTextField name="city" label="Населенный пункт" required />
            <FormTextField name="address" label="Адрес" required />
            <Box className={styles.shippingFormRow}>
              <FormTextField name="entrance" label="Подъезд" />
              <FormTextField name="floor" label="Этаж" />
              <FormTextField name="apartment" label="Квартира" />
            </Box>
            <FormTextField name="comment" label="Комментарий к заказу" multiline rows={4} />
            <FormCheckbox name="sendEmail" label="Выслать чек на почту" />
            <FormRadioGroup name="payment" options={options} />
          </div>
          <div className={classNames(styles.footer, styles.shippingFooter)}>
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
            <ButtonMain label="Оформить заказ" endIcon={<ArrowForwardIcon />} type="submit" />
          </div>
        </form>
      </FormProvider>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
        open={cartState === SHOPPING_CART_STATE.CART_PROCESSING}
        onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

ShoppingCartShipping.propTypes = {
  cartTotal: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  cartState: PropTypes.string.isRequired,
  checkout: PropTypes.func.isRequired
};

export default ShoppingCartShipping;
