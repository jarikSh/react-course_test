import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import Card from 'shared/components/Card';
import CardList from 'shared/components/CardList';
import { useFavorites } from 'shared/context/FavoritesContext';
import backIcon from 'assets/images/arrow-left.svg';
import noFavorites from 'assets/images/no-favorites.png';
import buttons from 'styles/buttons.module.scss';
import typography from 'styles/typography.module.scss';

import styles from './Favorites.module.scss';

const Favorites = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length) {
    const cards = favorites.map((item) => <Card key={item.id} item={item} />);

    return (
      <main>
        <div className={styles.header}>
          <button
            className={classNames(buttons.actionButton, styles.backButton)}
            onClick={() => navigate(-1)}>
            <img src={backIcon} alt="back" />
          </button>
          <h1 className={typography.title}>Мои закладки</h1>
        </div>
        <CardList>{cards}</CardList>
      </main>
    );
  }

  return (
    <main className={styles.emptyFavorites}>
      <div>
        <img src={noFavorites} alt="no favorites" />
        <h3>Закладок нет :(</h3>
        <p>Вы ничего не добавляли в закладки</p>
        <button className={buttons.buttonMain} onClick={() => navigate('/')}>
          &larr; Вернуться назад
        </button>
      </div>
    </main>
  );
};

export default Favorites;
