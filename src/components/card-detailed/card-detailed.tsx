
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LOCAL_RU, PagesName, REVIEW_SHOW_OFF_LIMITS, StarSize } from '../../const';
import { basicGuitarMock } from '../../utils/mock-data/guitar-mock';
import { basicReviewMock } from '../../utils/mock-data/review-mock';
import { compareFunctionEarlyToLate, formatImgUrl } from '../../utils/utils-components';
import { Breadcrumbs, RatingStars } from '../common/common';
import NotAvailablePage from '../not-available-page/not-available-page';
import { CardReview } from './components/components';

function CardDetailed():JSX.Element {
  const {id} = useParams<{id: string}>();
  const titleElement = useRef<HTMLHeadingElement | null>(null);
  const [isCharacteristics, setIsCharacteristics] = useState(true);
  const [isDescription, setIsDescription] = useState(false);
  const [showOffLimit, setShowOffLimit] = useState(REVIEW_SHOW_OFF_LIMITS);
  const guitars = basicGuitarMock;
  const result = guitars.find((line) => line.id === Number(id));
  const reviews = basicReviewMock;
  const filtratedReviews = reviews
    .slice()
    .sort(compareFunctionEarlyToLate);

  const handleShowMoreClick = useCallback(() => {
    setShowOffLimit(showOffLimit + REVIEW_SHOW_OFF_LIMITS);
  }, [showOffLimit]);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = document.documentElement.clientHeight;
      const scrollTop = window.pageYOffset;

      const scrollBottom = scrollHeight - windowHeight - scrollTop;

      if ((scrollBottom < 280) && (showOffLimit < filtratedReviews.length)) {
        handleShowMoreClick();
      }
    });
  }, [filtratedReviews.length, handleShowMoreClick, showOffLimit]);


  if (!result) {
    return <NotAvailablePage />;
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
  } = result;

  const handleCharacteristicTabClick = () => {
    setIsCharacteristics(true);
    setIsDescription(false);
  };

  const handleDescriptionTabClick = () => {
    setIsCharacteristics(false);
    setIsDescription(true);
  };


  const handleGoUpLink = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    titleElement.current?.scrollIntoView({behavior: 'smooth' });
  };

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger" ref={titleElement}>Товар</h1>
        <Breadcrumbs ProductTitle={name} pageContent={PagesName.Guitar.en}/>

        <div className="product-container">
          <img
            className="product-container__img"
            src={`/${previewImg}`}
            srcSet={formatImgUrl(previewImg)}
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
              <a
                className={`button button--medium tabs__button ${!isDescription && 'button--black-border'}`}
                onClick={handleDescriptionTabClick}
                href="#description"
              >Описание
              </a>

              <div className="tabs__content" id="characteristics">
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
                    <p className={`tabs__product-description ${!isDescription && 'hidden'}`}>{description}</p>
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
          <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
          {filtratedReviews
            .slice(0, showOffLimit)
            .map((line) => <CardReview reviewInfo={line} key={line.id}/>)}
          {
            showOffLimit < filtratedReviews.length
              ?
              <button className="button button--medium reviews__more-button" onClick={handleShowMoreClick}>Показать еще отзывы</button>
              :
              ''
          }
          <Link className="button button--up button--red-border button--big reviews__up-button" to="#header" onClick={handleGoUpLink}>Наверх</Link>
        </section>
      </div>
    </main>
  );
}

export default CardDetailed;
