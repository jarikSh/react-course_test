import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CART_ACTION_TYPES, createAction } from 'shared/actions';
import { useShoppingCartReducer, SHOPPING_CART_STATE } from 'shared/reducers/shoppingCartReducer';
import axiosInstance from 'shared/utilities/http';
import { validatePromoCode } from 'shared/utilities/promoCodes';
import { showError } from 'shared/utilities/toast';

const PROMO_CODE_STORAGE_KEY = 'cart_promo_code';

const INITIAL_STATE = {
  isCartOpen: false,
  setIsCartOpen: (isOpen) => {},
  cartItems: [],
  addItemToCart: (product) => {},
  removeItemFromCart: (productId) => {},
  checkout: () => {},
  cartTotal: 0,
  discount: 0,
  appliedPromoCode: null,
  applyPromoCode: (code) => {},
  removePromoCode: () => {},
  isDataLoading: true,
  hasError: false,
  cartState: SHOPPING_CART_STATE.CART_PRODUCTS,
  setCartState: (newCartState) => {}
};

export const ShoppingCartContext = createContext(INITIAL_STATE);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
}

export const ShoppingCartProvider = ({ children }) => {
  const [state, dispatch] = useShoppingCartReducer();
  const {
    isCartOpen,
    cartTotal,
    cartItems,
    isDataLoading,
    hasError,
    cartState,
    appliedPromoCode,
    discount
  } = state;

  useEffect(() => {
    dispatch(createAction(CART_ACTION_TYPES.FETCH_CART_INIT));

    const controller = new AbortController();

    axiosInstance
      .get('/cart', { signal: controller.signal })
      .then((response) => {
        dispatch(createAction(CART_ACTION_TYPES.FETCH_CART_SUCCESS, response.data));

        const savedPromo = localStorage.getItem(PROMO_CODE_STORAGE_KEY);
        if (savedPromo) {
          try {
            const promo = JSON.parse(savedPromo);
            const cartTotal = response.data.reduce((sum, item) => sum + item.price, 0);
            const validation = validatePromoCode(promo.code, cartTotal);
            if (validation.valid) {
              dispatch(createAction(CART_ACTION_TYPES.APPLY_PROMO_CODE, promo));
            } else {
              localStorage.removeItem(PROMO_CODE_STORAGE_KEY);
            }
          } catch {
            localStorage.removeItem(PROMO_CODE_STORAGE_KEY);
          }
        }
      })
      .catch((e) => {
        if (e.code !== 'ERR_CANCELED') {
          dispatch(createAction(CART_ACTION_TYPES.FETCH_CART_FAILED));
          showError('An error occurred while loading cart');
        }
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItemToCart = (product) => {
    const { id, ...newCartObject } = product;
    axiosInstance
      .post('/cart', { productId: id, ...newCartObject })
      .then((response) => {
        dispatch(createAction(CART_ACTION_TYPES.ADD_TO_CART, response.data));
      })
      .catch((error) => {
        showError('Failed to add product to cart');
      });
  };

  const removeItemFromCart = (productId) => {
    const cartItemToRemove = cartItems.find((item) => item.productId === productId);
    if (!cartItemToRemove) {
      return;
    }

    axiosInstance
      .delete(`/cart/${cartItemToRemove.id}`)
      .then((response) => {
        dispatch(createAction(CART_ACTION_TYPES.REMOVE_FROM_CART, response.data));
      })
      .catch((error) => {
        showError('Failed to remove product from cart');
      });
  };

  const applyPromoCode = (code) => {
    const result = validatePromoCode(code, cartTotal);
    if (result.valid) {
      dispatch(createAction(CART_ACTION_TYPES.APPLY_PROMO_CODE, result.promo));
      localStorage.setItem(PROMO_CODE_STORAGE_KEY, JSON.stringify(result.promo));
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const removePromoCode = () => {
    dispatch(createAction(CART_ACTION_TYPES.REMOVE_PROMO_CODE));
    localStorage.removeItem(PROMO_CODE_STORAGE_KEY);
  };

  const setCartState = (newCartState) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_STATE, newCartState));
  };

  const checkout = async () => {
    try {
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_STATE, SHOPPING_CART_STATE.CART_PROCESSING));

      for (var i = 0; i < cartItems.length; ++i) {
        await axiosInstance.delete(`/cart/${cartItems[i].id}`);
      }
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_STATE, SHOPPING_CART_STATE.CART_DONE));
      localStorage.removeItem(PROMO_CODE_STORAGE_KEY);
    } catch (error) {
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_STATE, SHOPPING_CART_STATE.CART_ERROR));
      showError('Failed to process the order.');
    }
  };

  const setIsCartOpen = (isOpen) => {
    if (!isOpen && cartState === SHOPPING_CART_STATE.CART_PROCESSING) {
      return;
    }

    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    checkout,
    cartItems,
    cartTotal,
    discount,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    isDataLoading,
    hasError,
    cartState,
    setCartState
  };

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired
};
