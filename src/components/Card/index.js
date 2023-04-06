import styles from './Card.module.scss';
import React from 'react';

function Card({ title, url, id, price, onFavorite, onPlus, favorited = false, added = false }) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleClickPlus = () => {
    onPlus({ id, title, url, price });
    setIsAdded(!isAdded);
  };

  const handleClickLike = () => {
    onFavorite({ id, title, url, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={handleClickLike}>
        <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
      </div>
      <img width={133} height={112} src={url} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          onClick={handleClickPlus}
          className={styles.plus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
