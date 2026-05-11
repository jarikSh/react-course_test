import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import { useShoppingCart } from 'shared/context/ShoppingCartContext';
import { useUser } from 'shared/context/UserContext';
import { formatCurrency } from 'shared/utilities/formatCurrency';
import addFavorite from 'assets/images/add-favorite.svg';
import cart from 'assets/images/cart.svg';
import logo from 'assets/images/logo.png';
import profile from 'assets/images/profile.svg';

import styles from './Header.module.scss';

function Header() {
  const { setIsCartOpen, cartTotal } = useShoppingCart();
  const cartTotalText = formatCurrency(cartTotal);

  const { setIsLoginModalOpen } = useUser();
  const handleClickOpen = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <header>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h3 className={styles.title}>React sneakers</h3>
        <p className={styles.subtitle}>Магазин лучших кроссовок</p>
      </Link>
      <div className={styles.actions}>
        <Button
          color="iconButton"
          variant="text"
          startIcon={<img src={cart} alt="cart" />}
          onClick={() => setIsCartOpen(true)}>
          {cartTotalText}
        </Button>
        <IconButton component={Link} to="/favorites">
          <img src={addFavorite} alt="favorites" />
        </IconButton>
        <IconButton onClick={handleClickOpen}>
          <img src={profile} alt="profile" />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
