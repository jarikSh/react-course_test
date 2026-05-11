import PropTypes from 'prop-types';

import styles from './CardList.module.scss';

const CardList = ({ children }) => {
  return <div className={styles.cards}>{children}</div>;
};

CardList.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardList;
