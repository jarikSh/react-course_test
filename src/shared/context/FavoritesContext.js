import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: (item) => {},
  removeFromFavorites: (item) => {}
});

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

const getLocalStorageFavorites = () => {
  const localData = localStorage.getItem('favorites');
  return localData ? JSON.parse(localData).filter((item) => item && item.id !== undefined) : [];
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getLocalStorageFavorites);

  useEffect(() => {
    const storageEvent = (event) => {
      if (event.key === 'favorites') {
        setFavorites(getLocalStorageFavorites());
      }
    };

    window.addEventListener('storage', storageEvent);

    return () => {
      window.removeEventListener('storage', storageEvent);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (toAdd) => {
    setFavorites([...favorites, toAdd]);
  };
  const removeFromFavorites = (toRemove) => {
    setFavorites(favorites.filter((item) => item.id !== toRemove.id));
  };
  const value = { favorites, addToFavorites, removeFromFavorites };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired
};
