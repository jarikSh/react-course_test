import arrowLeft from 'assets/images/arrow-left.svg';
import arrowRight from 'assets/images/arrow-right.svg';
import carouselImageIcon from 'assets/images/carousel-image-icon.png';
import carouselImageMain from 'assets/images/carousel-image-main.png';

import styles from './Carousel.module.scss';

function Carousel() {
  return (
    <div className={styles.carousel}>
      <div className={styles.item}>
        <div className={styles.content}>
          <img src={carouselImageIcon} className={styles.icon} alt="Carousel" />
          <p>Stan Smith,</p>
          <p>Forever!</p>
          <a href="/">Купить</a>
        </div>

        <img src={carouselImageMain} alt="Carousel" />
      </div>
      <button type="button" className={styles.prev}>
        <img src={arrowLeft} alt="prev" />
      </button>
      <button type="button" className={styles.next}>
        <img src={arrowRight} alt="next" />
      </button>
    </div>
  );
}

export default Carousel;
