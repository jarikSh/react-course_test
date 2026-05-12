import { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';

import styles from './ShoppingCart.module.scss';

function ShoppingCartPromoCode({ applyPromoCode, removePromoCode, appliedPromoCode }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApply = () => {
    setError('');
    setSuccess('');
    const result = applyPromoCode(inputValue);
    if (result.success) {
      setSuccess('Промокод применён!');
      setInputValue('');
    } else {
      setError(result.error);
    }
  };

  const handleRemove = () => {
    removePromoCode();
    setError('');
    setSuccess('');
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApply();
    }
  };

  if (appliedPromoCode) {
    return (
      <div className={styles.promoCode}>
        <div className={styles.promoCodeApplied}>
          <LocalOfferIcon fontSize="small" className={styles.promoCodeIcon} />
          <span className={styles.promoCodeLabel}>
            {appliedPromoCode.code} — {appliedPromoCode.description}
          </span>
          <IconButton
            size="small"
            aria-label="Удалить промокод"
            onClick={handleRemove}
            className={styles.promoCodeRemove}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.promoCode}>
      <div className={styles.promoCodeRow}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Введите промокод"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
            setSuccess('');
          }}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error || success}
          FormHelperTextProps={{
            className: success ? styles.promoCodeSuccess : undefined
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalOfferIcon fontSize="small" />
              </InputAdornment>
            )
          }}
          className={styles.promoCodeInput}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleApply}
          className={styles.promoCodeButton}
          disabled={!inputValue.trim()}>
          Применить
        </Button>
      </div>
    </div>
  );
}

ShoppingCartPromoCode.propTypes = {
  applyPromoCode: PropTypes.func.isRequired,
  removePromoCode: PropTypes.func.isRequired,
  appliedPromoCode: PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

ShoppingCartPromoCode.defaultProps = {
  appliedPromoCode: null
};

export default ShoppingCartPromoCode;
