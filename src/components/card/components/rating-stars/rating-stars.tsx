import { RATING_OPTIONS, StarSize } from '../../../../const';

type RatingStarsProps = {
  type:  keyof typeof StarSize,
};

const TEMPORARY_RATING = 3;

function RatingStars(props: RatingStarsProps) {
  const {type} = props;
  return(
    <>
      {
        RATING_OPTIONS.map((line) => (
          <svg width={StarSize[type].width} height={StarSize[type].height} aria-hidden="true" key={`star-rating-${line.rating}`}>
            <use xlinkHref={TEMPORARY_RATING <= line.rating ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))
      }
      <p className="visually-hidden">Оценка: {RATING_OPTIONS.find((line) => line.rating === TEMPORARY_RATING)?.value}</p>
    </>

  );
}

export default RatingStars;
