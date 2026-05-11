import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  setIsLoginModalOpen: (isOpen) => {},
  setIsSignUpModalOpen: (isOpen) => {}
};

export const UserContext = createContext(INITIAL_STATE);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const onSetIsLoginModalOpen = useCallback((isOpen) => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(isOpen);
  }, []);

  const onSetIsSignUpModalOpen = useCallback((isOpen) => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(isOpen);
  }, []);

  const value = {
    isLoginModalOpen,
    isSignUpModalOpen,
    setIsLoginModalOpen: onSetIsLoginModalOpen,
    setIsSignUpModalOpen: onSetIsSignUpModalOpen
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
