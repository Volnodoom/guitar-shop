import { StarSize } from '../../../../const';
import { RatingStars } from '../../../common/common';


function CardPreview() {
  return(
    <div className="product-card">
      <img src="/img/content/catalog-product-0.jpg" srcSet="/img/content/catalog-product-0@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars type={StarSize.CardPreview.name}/>
        </div>
        <p className="product-card__title">СURT Z30 Plus Acoustics</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>129 500 ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default CardPreview;
