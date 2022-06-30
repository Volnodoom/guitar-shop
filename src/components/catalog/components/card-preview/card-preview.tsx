import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, LOCAL_RU, StarSize } from '../../../../const';
import * as selectorCart from '../../../../store/data-cart/selector-cart';
import * as selectorReviews from '../../../../store/data-reviews/selectors-reviews';
import { GuitarType } from '../../../../types/general.types';
import { State } from '../../../../types/state.types';
import { formatBaseImgUrl, formatHighDensityImgUrl } from '../../../../utils/utils-components';
import { RatingStars } from '../../../common/common';

type CardPreviewProps = {
  itemInfo: GuitarType,
  setModalFrame: React.Dispatch<React.SetStateAction<boolean>>,
  setGuitar: React.Dispatch<React.SetStateAction<GuitarType | undefined>>,
}

function CardPreview({itemInfo, setModalFrame, setGuitar}: CardPreviewProps) {
  const {
    id,
    name,
    previewImg,
    rating,
    price,
  } = itemInfo;

  const navigate = useNavigate();

  const reviewNumber = useSelector(selectorReviews.getReviewsByGuitarId(id)).length;
  const cartQuantityCurrentItem = useSelector((state: State) => selectorCart.getCartQuantityForCurrentProduct(state, itemInfo.id));

  const handleLinkClick = () => {
    document.body.scrollIntoView();
  };

  const handleAddToCartClick = () => {
    if (cartQuantityCurrentItem && cartQuantityCurrentItem > 0) {
      navigate(AppRoutes.CartAbsolute);
      return;
    }

    setModalFrame(true);
    setGuitar(itemInfo);
  };

  return(
    <div className="product-card">
      <img
        src={`/${formatBaseImgUrl(previewImg)}`}
        srcSet={`/${formatBaseImgUrl(formatHighDensityImgUrl(previewImg))}`}
        width="75"
        height="190"
        alt={`${name}.`}
      />

      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars ratingValue={rating} type={StarSize.CardPreview.name}/>
          <p className="rate__count" data-testid={'review-number'}>
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
        <Link className="button button--mini"
          to={AppRoutes.GuitarAbsolute(id)}
          onClick={handleLinkClick}
        >Подробнее
        </Link>
        {
          cartQuantityCurrentItem && cartQuantityCurrentItem > 0

            ?

            <Link
              className="button button--red-border button--mini button--in-cart"
              to={AppRoutes.CartAbsolute}
            >В Корзине
            </Link>

            :

            <button
              className="button button--red button--mini button--add-to-cart"
              onClick={handleAddToCartClick}
            >Купить
            </button>
        }

      </div>
    </div>
  );
}

export default CardPreview;
