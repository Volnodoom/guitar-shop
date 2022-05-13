import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as selectorGuitar  from '../../store/data-guitars/selectors-guitars';
import * as selectorReview from '../../store/data-reviews/selectors-reviews';
import { GuitarType, Review } from '../../types/general.types';

export const useIdGetProductInfo = (): [GuitarType | undefined, Review[], string | undefined] => {
  const {id} = useParams<{id: string}>();
  const guitar = useSelector(selectorGuitar.getOneGuitar(Number(id)));
  const reviews = useSelector(selectorReview.getReviewsByGuitarId(Number(id)));

  return [guitar, reviews, id];
};
