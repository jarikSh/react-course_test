import { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useFavorites } from 'shared/context/FavoritesContext';
import { useShoppingCart } from 'shared/context/ShoppingCartContext';
import { formatCurrency } from 'shared/utilities/formatCurrency';
import addFavorite from 'assets/images/add-favorite.svg';
import addToCart from 'assets/images/add-to-cart.svg';
import favorite from 'assets/images/favorite.svg';
import inCart from 'assets/images/in-cart.svg';
import buttons from 'styles/buttons.module.scss';

import styles from './Card.module.scss';

function Card({ item }) {
  const { id, name, price, image } = item;

  const { cartItems, addItemToCart, removeItemFromCart } = useShoppingCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isInCart = cartItems.some((cartItem) => cartItem.productId === id);
  const isInFavorites = favorites.some((favoriteItem) => favoriteItem.id === id);
  const cardClasses = classNames(styles.product, isInCart && styles.productInCart);

  const favoriteButtonClasses = classNames(
    buttons.actionButton,
    isInFavorites ? styles.removeFromFavorite : styles.addToFavorite
  );
  const favoriteButtonAction = isInFavorites ? removeFromFavorites : addToFavorites;
  const favoriteButtonImage = isInFavorites ? favorite : addFavorite;

  const cartButtonClasses = classNames(buttons.actionButton, isInCart && styles.removeFromCart);
  const cartButtonAction = useCallback(
    () => (isInCart ? removeItemFromCart(id) : addItemToCart(item)),
    [addItemToCart, id, isInCart, item, removeItemFromCart]
  );
  const cartButtonImage = isInCart ? inCart : addToCart;

  return (
    <div className={cardClasses}>
      <img className={styles.image} src={image} alt={name} />
      <button className={favoriteButtonClasses} onClick={() => favoriteButtonAction(item)}>
        <img src={favoriteButtonImage} alt="favorite" />
      </button>
      <p className={styles.title}>{name}</p>
      <div className={styles.actions}>
        <div>
          <p className={styles.priceTitle}>Цена:</p>
          <p className={styles.priceCost}>{formatCurrency(price)}</p>
        </div>
        <button className={cartButtonClasses} onClick={cartButtonAction}>
          <img src={cartButtonImage} alt="cart action" />
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })
};

export default Card;
