import { RATING_OPTIONS, StarSize } from '../../../const';

type RatingStarsProps = {
  type:  keyof typeof StarSize,
  ratingValue: number,
};

function RatingStars(props: RatingStarsProps) {
  const {type, ratingValue} = props;
  return(
    <>
      {
        RATING_OPTIONS
          .slice()
          .reverse()
          .map((line) => (
            <svg
              width={StarSize[type].width}
              height={StarSize[type].height}
              aria-hidden="true"
              key={`star-rating-${line.rating}`}
            >
              <use
                xlinkHref={line.rating <= ratingValue ? '#icon-full-star' : '#icon-star'}
                data-testid={line.rating <= ratingValue ? 'icon-full-star' : ''}
              >
              </use>
            </svg>
          ))
      }
      <p className="visually-hidden">
        Рейтинг: {RATING_OPTIONS.find((line) => line.rating === ratingValue)?.value}
      </p>
    </>

  );
}

export default RatingStars;
