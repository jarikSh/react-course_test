import PropTypes from 'prop-types';

import search from 'assets/images/search.svg';

import styles from './SearchInput.module.scss';

function SearchInput({ value, handleChange }) {
  return (
    <div className={styles.searchWrapper}>
      <img src={search} alt="Search" />
      <input
        placeholder="Поиск…"
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default SearchInput;
