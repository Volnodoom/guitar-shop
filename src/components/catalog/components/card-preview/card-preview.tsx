import { Link } from 'react-router-dom';
import { AppRoutes, LOCAL_RU, StarSize } from '../../../../const';
import { GuitarType } from '../../../../types/general.types';
import { formatImgUrl } from '../../../../utils/utils-components';
import { RatingStars } from '../../../common/common';

type CardPreviewProps = {
  itemInfo: GuitarType;
}

function CardPreview(props: CardPreviewProps) {
  const {
    id,
    name,
    previewImg,
    rating,
    price,
  } = props.itemInfo;

  const reviewNumber = 9;

  return(
    <div className="product-card">
      <img
        src={`/${previewImg}`}
        srcSet={formatImgUrl(previewImg)}
        width="75"
        height="190"
        alt={`${name}.`}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars ratingValue={rating} type={StarSize.CardPreview.name}/>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewNumber}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString(LOCAL_RU)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={AppRoutes.Guitar(id)}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to={AppRoutes.Cart}>Купить</Link>
      </div>
    </div>
  );
}

export default CardPreview;
