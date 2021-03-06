import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LOCAL_RU, ModalKind, PagesName, StarSize } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { useIdGetProductInfo } from '../../hooks/use-id-get-product-info/use-id-get-product-info';
import { fetchOneGuitarAction } from '../../store/data-guitars/actions-guitars';
import * as selectorGuitar from '../../store/data-guitars/selectors-guitars';
import { fetchReviewsAction } from '../../store/data-reviews/actions-reviews';
import * as selectorReview from '../../store/data-reviews/selectors-reviews';
import { GuitarType } from '../../types/general.types';
import { checkStatusFailed, checkStatusLoading, checkStatusSuccess, formatBaseImgUrl, formatHighDensityImgUrl } from '../../utils/utils-components';
import { Breadcrumbs, ModalFrame, RatingStars } from '../common/common';
import LoadingScreen from '../loading-screen/loading-screen';
import PageOnError from '../page-on-error/page-on-error';
import { ReviewsListInteraction, Tabs } from './components/components';

function CardDetailed():JSX.Element {
  const [guitar, reviews, id] = useIdGetProductInfo();
  const dispatch = useAppDispatch();

  const guitarStatus = useSelector(selectorGuitar.getOneGuitarStatus);
  const isGuitarSuccess = checkStatusSuccess(guitarStatus);
  const isGuitarLoading = checkStatusLoading(guitarStatus);
  const isGuitarFailed = checkStatusFailed(guitarStatus);

  const reviewsStatus = useSelector(selectorReview.getReviewsStatus);
  const isReviewsSuccess = checkStatusSuccess(reviewsStatus);

  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<ModalKind>(ModalKind.Null);

  const isComponentLoading = (!guitar && !isGuitarSuccess && !isReviewsSuccess) || isGuitarLoading;

  useEffect(() => {
    if(!guitar && !isGuitarFailed ) {
      dispatch(fetchOneGuitarAction(Number(id)));
    }

    if(reviews.length === 0 && !isReviewsSuccess && guitar) {
      dispatch(fetchReviewsAction(Number(id)));
    }
  }, [
    dispatch,
    id,
    guitar,
    reviews.length,
    reviewsStatus,
    guitarStatus,
    isGuitarFailed,
    isReviewsSuccess
  ]);

  if (!guitar && isGuitarFailed) {
    return <PageOnError />;
  }

  if(isComponentLoading) {
    return <LoadingScreen />;
  }

  const {
    name,
    previewImg,
    rating,
    price
  } = guitar as GuitarType;

  const handleReviewModalClick = () => {
    setIsModalActive(true);
    setCurrentModalType(ModalKind.Review);
  };

  const handleCartAddModalClick = () => {
    setIsModalActive(true);
    setCurrentModalType(ModalKind.CartAdd);
  };

  const handleModalFrameOnClose = () => {
    setIsModalActive(false);
    setCurrentModalType(ModalKind.Null);
  };

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">??????????</h1>
        <Breadcrumbs productTitle={name} pageContent={PagesName.Guitar.en}/>

        <div className="product-container">
          <img
            className="product-container__img"
            src={`/${formatBaseImgUrl(previewImg)}`}
            srcSet={`/${formatBaseImgUrl(formatHighDensityImgUrl(previewImg))}`}
            width="90"
            height="235"
            alt={name}
          />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
            <div className="rate product-container__rating">
              <RatingStars ratingValue={rating} type={StarSize.CardDetailed.name}/>
              <p className="rate__count">
                <span className="visually-hidden">?????????? ????????????:</span>
                {reviews.length}
              </p>
            </div>
            <Tabs />
          </div>

          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">????????:</p>
            <p className="product-container__price-info product-container__price-info--value">{price.toLocaleString(LOCAL_RU)} ???</p>
            <button
              className="button button--red button--big product-container__button"
              onClick={handleCartAddModalClick}
            >???????????????? ?? ??????????????
            </button>
          </div>
        </div>

        <ReviewsListInteraction onCreateReviewClick={handleReviewModalClick}/>

        <ModalFrame
          onClose={handleModalFrameOnClose}
          isOpen={isModalActive}
          modalKind={currentModalType}
          guitarDetails={guitar}
        />
      </div>
    </main>
  );
}

export default CardDetailed;
