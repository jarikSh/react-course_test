import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import styles from './ButtonMain.module.scss';

const ButtonMain = (props) => {
  const { label, ...restProps } = props;

  return (
    <Button
      variant="contained"
      color="mainButton"
      size="large"
      className={styles.mainButton}
      {...restProps}>
      {label}
    </Button>
  );
};

ButtonMain.propTypes = {
  label: PropTypes.string.isRequired
};

export default ButtonMain;
