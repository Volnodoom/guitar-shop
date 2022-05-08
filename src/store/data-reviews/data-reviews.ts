import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LoadingStatus, NameSpace } from '../../const';
import { GeneralApiConfig, Review, UserReviewPost } from '../../types/general.types';
import { ReviewState, State } from '../../types/state.types';

const reviewsAdapter: EntityAdapter<Review> = createEntityAdapter();
const initialState: ReviewState = reviewsAdapter.getInitialState({
  reviewsStatus: LoadingStatus.Idle,
  commentStatus: LoadingStatus.Idle,
});

export const fetchReviewsAction = createAsyncThunk<Review[], number, GeneralApiConfig>(
  ApiAction.FetchReviews,
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(ApiRoutes.Reviews(id));
      return data;
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);

export const saveCommentAction = createAsyncThunk<Review, UserReviewPost, GeneralApiConfig>(
  ApiAction.SaveComment,
  async (userComment, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Review>(ApiRoutes.PostComment, userComment);
      return data;
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);


export const dataReviews = createSlice({
  name: NameSpace.DataReviews,
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        reviewsAdapter.upsertMany(state, action.payload);
        state.reviewsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = LoadingStatus.Failed;
      })
      .addCase(saveCommentAction.pending, (state) => {
        state.commentStatus = LoadingStatus.Loading;
      })
      .addCase(saveCommentAction.fulfilled, (state, action) => {
        reviewsAdapter.addOne(state, action.payload);
        state.commentStatus = LoadingStatus.Succeeded;
      })
      .addCase(saveCommentAction.rejected, (state) => {
        state.commentStatus = LoadingStatus.Failed;
      });
  }
});

export const rtkSelectorsReviews = reviewsAdapter.getSelectors((state: State) => state[NameSpace.DataReviews]);
