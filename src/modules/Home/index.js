import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import { PRODUCT_ACTION_TYPES, createAction } from 'shared/actions';
import Card from 'shared/components/Card';
import CardList from 'shared/components/CardList';
import CardLoader from 'shared/components/CardLoader';
import Carousel from 'shared/components/Carousel';
import SearchInput from 'shared/components/SearchInput';
import { useProductsReducer } from 'shared/reducers/productsReducer';
import axiosInstance from 'shared/utilities/http';
import { showError } from 'shared/utilities/toast';
import typography from 'styles/typography.module.scss';

import styles from './Home.module.scss';

const ErrorBoundary = () => {
  return <h2 style={{ marginTop: '50px' }}>Ой, что-то пошло не так...</h2>;
};

function Home() {
  const [searchFilter, setSearchFilter] = useState('');
  const [state, dispatch] = useProductsReducer();
  const { products, isDataLoading, hasError } = state;

  useEffect(() => {
    dispatch(createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_INIT));

    const controller = new AbortController();

    axiosInstance
      .get('/products', { signal: controller.signal })
      .then((response) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, response.data));
      })
      .catch((e) => {
        if (e.code !== 'ERR_CANCELED') {
          dispatch(createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_FAILED));
          showError('An error occurred while loading products');
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const items = useMemo(
    () =>
      searchFilter.length
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchFilter.toLowerCase())
          )
        : products,
    [products, searchFilter]
  );

  const cards = isDataLoading
    ? Array.from({ length: 10 }, (_, i) => <CardLoader key={i} />)
    : items.map((item) => <Card key={item.id} item={item} />);

  return (
    <main>
      <Carousel />
      <div className={styles.header}>
        <h1 className={classNames(typography.title, styles.homeTitle)}>
          {searchFilter.length ? `Поиск по запросу:"${searchFilter}"` : 'Все кроссовки'}
        </h1>
        <SearchInput value={searchFilter} handleChange={setSearchFilter} />
      </div>
      {hasError ? <ErrorBoundary /> : <CardList>{cards}</CardList>}
    </main>
  );
}

export default Home;
