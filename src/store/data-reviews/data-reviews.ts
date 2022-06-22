import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { Review } from '../../types/general.types';
import { ReviewState, State } from '../../types/state.types';
import { fetchReviewsAction, saveCommentAction } from './actions-reviews';

const reviewsAdapter: EntityAdapter<Review> = createEntityAdapter();
export const initialState: ReviewState = reviewsAdapter.getInitialState({
  ids: [],
  entities: {},
  reviewsStatus: LoadingStatus.Idle,
  commentStatus: LoadingStatus.Idle,
});

export const dataReviews = createSlice({
  name: NameSpace.DataReviews,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      reviewsAdapter.addMany(state, action);
    },
    addOneReview: (state, action: PayloadAction<Review>) => {
      reviewsAdapter.addOne(state, action.payload);
    },
    setCommentStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.commentStatus = action.payload;
    },
    setReviewsStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.reviewsStatus = action.payload;
    },
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state) => {
        state.reviewsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = LoadingStatus.Failed;
      })
      .addCase(saveCommentAction.pending, (state) => {
        state.commentStatus = LoadingStatus.Loading;
      })
      .addCase(saveCommentAction.fulfilled, (state) => {
        state.commentStatus = LoadingStatus.Succeeded;
      })
      .addCase(saveCommentAction.rejected, (state) => {
        state.commentStatus = LoadingStatus.Failed;
      });
  }
});

export const rtkSelectorsReviews = reviewsAdapter.getSelectors((state: State) => state[NameSpace.DataReviews]);

export const {
  setReviews,
  addOneReview,
  setCommentStatus,
  setReviewsStatus,
} = dataReviews.actions;
