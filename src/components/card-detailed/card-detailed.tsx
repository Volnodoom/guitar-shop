import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HashKind, LOCAL_RU, ModalKind, PageScrollOptions, PagesName, REVIEW_SHOW_OFF_LIMITS, StarSize } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { useReviewsOnScroll } from '../../hooks/use-reviews-on-scroll/use-reviews-on-scroll';
import { fetchOneGuitarAction } from '../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../store/data-guitars/selectors-guitars';
import { fetchReviewsAction } from '../../store/data-reviews/data-reviews';
import * as selectorReview from '../../store/data-reviews/selectors-reviews';
import { GuitarType } from '../../types/general.types';
import { checkStatusFailed, checkStatusSuccess, compareFunctionEarlyToLate, formatBaseImgUrl, formatHighDensityImgUrl } from '../../utils/utils-components';
import { Breadcrumbs, RatingStars } from '../common/common';
import LoadingScreen from '../loading-screen/loading-screen';
import NotAvailablePage from '../not-available-page/not-available-page';
import { CardReview, ModalFrame } from './components/components';

function CardDetailed():JSX.Element {
  const {id} = useParams<{id: string}>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const mainElement = useRef<HTMLElement | null>(null);
  const tabRef = useRef<HTMLDivElement | null>(null);

  const guitar = useSelector(selectorGuitar.getOneGuitar(Number(id)));
  const guitarStatus = useSelector(selectorGuitar.getOneGuitarStatus);
  const isGuitarSuccess = checkStatusSuccess(guitarStatus);
  const isGuitarFailed = checkStatusFailed(guitarStatus);

  const reviews = useSelector(selectorReview.getReviewsByGuitarId(Number(id)));
  const reviewsStatus = useSelector(selectorReview.getReviewsStatus);
  const isReviewsSuccess = checkStatusSuccess(reviewsStatus);

  const [isCharacteristics, setIsCharacteristics] = useState(true);
  const [isDescription, setIsDescription] = useState(false);
  const [showOffLimit, setShowOffLimit] = useState(REVIEW_SHOW_OFF_LIMITS);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalInfo, setModalInfo] = useState<null | ModalKind>(null);

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

  const handleCharacteristicTabClick = () => {
    setIsCharacteristics(true);
    setIsDescription(false);
  };

  const handleDescriptionTabClick = () => {
    setIsCharacteristics(false);
    setIsDescription(true);
  };

  useEffect(() => {
    if (location.hash) {
      location.hash === HashKind.Characteristics ? handleCharacteristicTabClick() : handleDescriptionTabClick();
      tabRef.current?.scrollIntoView({behavior: PageScrollOptions.Smooth});
    }

  },[location.hash]);

  const handleShowMoreClick = useCallback(() => {
    setShowOffLimit(showOffLimit + REVIEW_SHOW_OFF_LIMITS);
  }, [showOffLimit]);

  const filtratedReviews = reviews.slice().sort(compareFunctionEarlyToLate);
  useReviewsOnScroll(showOffLimit, filtratedReviews, handleShowMoreClick);

  if (!guitar && isGuitarFailed) {
    return <NotAvailablePage />;
  }

  if(!guitar && !isGuitarSuccess && !isReviewsSuccess) {
    return <LoadingScreen />;
  }

  const {
    name,
    vendorCode,
    type,
    description,
    previewImg,
    stringCount,
    rating,
    price
  } = guitar as GuitarType;

  const handleGoUpLink = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    mainElement.current?.scrollIntoView({behavior: PageScrollOptions.Smooth });
  };

  const handleReviewModalClick = () => {
    setIsModalActive(true);
    setModalInfo(ModalKind.Review);
  };

  return(
    <main className="page-content" ref={mainElement}>
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <Breadcrumbs ProductTitle={name} pageContent={PagesName.Guitar.en}/>

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
                <span className="visually-hidden">Всего оценок:</span>
                {reviews.length}
              </p>
            </div>

            <div className="tabs">
              <Link
                className={`button button--medium tabs__button ${!isCharacteristics && 'button--black-border'}`}
                onClick={handleCharacteristicTabClick}
                to="#characteristics"
              >Характеристики
              </Link>
              <Link
                className={`button button--medium tabs__button ${!isDescription && 'button--black-border'}`}
                onClick={handleDescriptionTabClick}
                to="#description"
              >Описание
              </Link>

              <div
                className="tabs__content"
                id={isCharacteristics ? HashKind.Characteristics : HashKind.Description}
                ref={tabRef}
              >
                {
                  isCharacteristics
                    ?
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{type}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{stringCount} струнная</td>
                        </tr>
                      </tbody>
                    </table>
                    :
                    <p
                      className={`tabs__product-description ${!isDescription && 'hidden'}`}
                    >{description}
                    </p>
                }
              </div>
            </div>

          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{price.toLocaleString(LOCAL_RU)} ₽</p>
            <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>

        <section className="reviews">
          <h3 className="reviews__title title title--bigger">Отзывы</h3>
          <button
            className="button button--red-border button--big reviews__sumbit-button"
            type="button"
            onClick={handleReviewModalClick}
          >Оставить отзыв
          </button>

          {
            filtratedReviews.length > 0
              ?
              filtratedReviews
                .slice(0, showOffLimit)
                .map((line) => <CardReview reviewInfo={line} key={line.id}/>)
              :
              <div className="review">
                <p className="review__value">Отзывов о данном товаре нет. Будь первым!</p>
              </div>
          }
          {
            showOffLimit < filtratedReviews.length
              ?
              <button
                className="button button--medium reviews__more-button"
                type="button"
                onClick={handleShowMoreClick}
              >Показать еще отзывы
              </button>
              :
              ''
          }
          <Link
            className="button button--up button--red-border button--big reviews__up-button"
            to="#header"
            onClick={handleGoUpLink}
          >Наверх
          </Link>
        </section>
        {
          <ModalFrame
            setModalFrameStatus={setIsModalActive}
            currentFrameStatus={isModalActive}
            modalInfo={modalInfo}
            setModalInfo={setModalInfo}
          />
        }
      </div>
    </main>
  );
}

export default CardDetailed;
