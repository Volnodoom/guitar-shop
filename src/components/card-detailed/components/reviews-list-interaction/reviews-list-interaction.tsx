import { Dispatch, MouseEvent, SetStateAction, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalKind, ONE, PageScrollOptions, REVIEW_SHOW_OFF_LIMITS } from '../../../../const';
import { useIdGetProductInfo } from '../../../../hooks/use-id-get-product-info/use-id-get-product-info';
import { useReviewsOnScroll } from '../../../../hooks/use-reviews-on-scroll/use-reviews-on-scroll';
import { compareFunctionEarlyToLate } from '../../../../utils/utils-components';
import { CardReview } from '../components';
import { zIndexPosition } from './style-reviews-list-interaction';

type ReviewsListInteractionProps = {
  setModalFrameStatus: Dispatch<SetStateAction<boolean>>,
  setModalInfo: Dispatch<SetStateAction<ModalKind | null>>,
}

function ReviewsListInteraction ({setModalFrameStatus, setModalInfo}: ReviewsListInteractionProps): JSX.Element {
  const  reviews = useIdGetProductInfo()[ONE];
  const [showOffLimit, setShowOffLimit] = useState(REVIEW_SHOW_OFF_LIMITS);

  const handleShowMoreClick = useCallback(() => {
    setShowOffLimit(showOffLimit + REVIEW_SHOW_OFF_LIMITS);
  }, [showOffLimit]);

  const filtratedReviews = reviews.slice().sort(compareFunctionEarlyToLate);
  useReviewsOnScroll(showOffLimit, filtratedReviews, handleShowMoreClick);

  const handleGoUpLink = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    document.body.scrollIntoView({behavior: PageScrollOptions.Smooth });
  };

  const handleReviewModalClick = () => {
    setModalFrameStatus(true);
    setModalInfo(ModalKind.Review);
  };


  return(
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
        style={zIndexPosition}
        onClick={handleGoUpLink}
      >Наверх
      </Link>
    </section>
  );
}

export default ReviewsListInteraction;
