import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Review } from '../../types/general.types';
import { State } from '../../types/state.types';
import { rtkSelectorsReviews } from './data-reviews';

const {
  selectAll: entireReviews,
} = rtkSelectorsReviews;

export const getReviewsStatus = (state: State) => state[NameSpace.DataReviews].reviewsStatus;
export const getSaveCommentStatus = (state: State) => state[NameSpace.DataReviews].commentStatus;

export const getReviewsByGuitar = (id: number) => {
  const getReviewsForGuitar = createSelector(
    entireReviews,
    (list) => list.filter((line: Review) => line.guitarId === id)
  );

  return getReviewsForGuitar;
};

