import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes } from '../../const';
import { handleError } from '../../services/handle-error';
import { GeneralApiConfig, Review, UserReviewPost } from '../../types/general.types';
import { addOneReview, setReviews } from './data-reviews';

export const fetchReviewsAction = createAsyncThunk<void, number, GeneralApiConfig>(
  ApiAction.FetchReviews,
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(ApiRoutes.Reviews(id));
      dispatch(setReviews(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const saveCommentAction = createAsyncThunk<void, UserReviewPost, GeneralApiConfig>(
  ApiAction.SaveComment,
  async (userComment, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Review>(ApiRoutes.PostComment, userComment);
      dispatch(addOneReview(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);
