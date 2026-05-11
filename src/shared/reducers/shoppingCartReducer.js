import { useReducer } from 'react';

import { CART_ACTION_TYPES } from 'shared/actions';

export const SHOPPING_CART_STATE = {
  CART_PRODUCTS: 'CART_PRODUCTS',
  CART_SHIPPING: 'CART_SHIPPING',
  CART_PROCESSING: 'CART_PROCESSING',
  CART_ERROR: 'CART_ERROR',
  CART_DONE: 'CART_DONE'
};

const addCartItem = (cartItems, toAdd) => {
  const idx = cartItems.findIndex((cartItem) => cartItem.id === toAdd.id);
  if (idx === -1) {
    return [...cartItems, toAdd];
  }

  return cartItems;
};

const removeCartItem = (cartItems, toRemove) => {
  const idx = cartItems.findIndex((item) => item.id === toRemove.id);
  if (idx !== -1) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  return cartItems;
};

const getCartTotal = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.price, 0);
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  isDataLoading: true,
  hasError: false,
  cartState: SHOPPING_CART_STATE.CART_PRODUCTS
};

const shoppingCartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.FETCH_CART_INIT: {
      return {
        ...state,
        isDataLoading: true,
        hasError: false
      };
    }
    case CART_ACTION_TYPES.FETCH_CART_FAILED: {
      return {
        ...state,
        isDataLoading: false,
        hasError: true
      };
    }
    case CART_ACTION_TYPES.FETCH_CART_SUCCESS: {
      const newCartTotal = getCartTotal(payload);
      return {
        ...state,
        cartItems: payload,
        cartTotal: newCartTotal,
        isDataLoading: false,
        hasError: false
      };
    }
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const newItems = addCartItem(state.cartItems, payload);
      const newCartTotal = getCartTotal(newItems);
      return {
        ...state,
        cartItems: newItems,
        cartTotal: newCartTotal
      };
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const newItems = removeCartItem(state.cartItems, payload);
      const newCartTotal = getCartTotal(newItems);
      return {
        ...state,
        cartItems: newItems,
        cartTotal: newCartTotal
      };
    }
    case CART_ACTION_TYPES.SET_CART_STATE: {
      const cartItems = payload === SHOPPING_CART_STATE.CART_DONE ? [] : state.cartItems;
      const cartTotal = payload === SHOPPING_CART_STATE.CART_DONE ? 0 : state.cartTotal;

      return {
        ...state,
        cartState: payload,
        cartItems: cartItems,
        cartTotal: cartTotal
      };
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        cartState: SHOPPING_CART_STATE.CART_PRODUCTS,
        isCartOpen: payload
      };
    default:
      throw new Error(`Unhandled action type '${type}' in shoppingCartReducer`);
  }
};

export const useShoppingCartReducer = () => useReducer(shoppingCartReducer, INITIAL_STATE);
