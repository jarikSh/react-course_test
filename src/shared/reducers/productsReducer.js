import { useReducer } from 'react';

import { PRODUCT_ACTION_TYPES } from 'shared/actions';

const INITIAL_STATE = {
  products: [],
  isDataLoading: true,
  hasError: false
};

const productsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_INIT: {
      return {
        ...state,
        isDataLoading: true,
        hasError: false
      };
    }
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_FAILED: {
      return {
        ...state,
        isDataLoading: false,
        hasError: true
      };
    }
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isDataLoading: false,
        hasError: false
      };
    default:
      throw new Error(`Unhandled action type '${type}' in productsReducer`);
  }
};

export const useProductsReducer = () => useReducer(productsReducer, INITIAL_STATE);
