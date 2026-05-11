import { useCallback } from 'react';
import { Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from 'shared/components/Header';
import Login from 'shared/components/Login';
import ShoppingCart from 'shared/components/ShoppingCart';
import SignUp from 'shared/components/SignUp';
import { useShoppingCart } from 'shared/context/ShoppingCartContext';

import styles from './AppLayout.module.scss';
import 'react-toastify/dist/ReactToastify.min.css';

function AppLayout() {
  const { isCartOpen, setIsCartOpen } = useShoppingCart();

  const onCloseCart = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);

  return (
    <>
      <div className={styles.mainWrapper}>
        <Header />
        <Outlet />
      </div>
      <ToastContainer />
      <Drawer anchor="right" open={isCartOpen} onClose={onCloseCart}>
        <ShoppingCart />
      </Drawer>
      <Login />
      <SignUp />
    </>
  );
}

export default AppLayout;
