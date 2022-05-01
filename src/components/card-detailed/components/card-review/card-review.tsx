import { StarSize } from '../../../../const';
import { Review } from '../../../../types/general.types';
import { formatReviewDate } from '../../../../utils/utils-components';
import { RatingStars } from '../../../common/common';

type CardReviewProps = {
  reviewInfo: Review
}

function CardReview(props: CardReviewProps): JSX.Element {
  const {
    userName,
    advantages,
    disadvantage,
    comment,
    rating,
    createAt,
  } = props.reviewInfo;

  return(
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{formatReviewDate(createAt)}</span>
      </div>
      <div className="rate review__rating-panel">
        <RatingStars ratingValue={rating} type={StarSize.ReviewCardDetailed.name}/>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantages}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default CardReview;
