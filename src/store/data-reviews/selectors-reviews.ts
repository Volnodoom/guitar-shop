import { NameSpace } from '../../const';
import { State } from '../../types/state.types';
import { rtkSelectorsReviews } from './data-reviews';

const {
  selectAll: entireReviews,
} = rtkSelectorsReviews;

export const getReviewsStatus = (state: State) => state[NameSpace.DataReviews].reviewsStatus;
export const getSaveCommentStatus = (state: State) => state[NameSpace.DataReviews].commentStatus;

export const getReviewsByGuitar = (id: number) => (state: State) => entireReviews(state)
  .filter((line) => line.guitarId === id);

