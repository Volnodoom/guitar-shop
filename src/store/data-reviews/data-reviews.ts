import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LoadingStatus, NameSpace } from '../../const';
import { handleError } from '../../services/handle-error';
import { GeneralApiConfig, Review, UserReviewPost } from '../../types/general.types';
import { ReviewState, State } from '../../types/state.types';

const reviewsAdapter: EntityAdapter<Review> = createEntityAdapter();
export const initialState: ReviewState = reviewsAdapter.getInitialState({
  ids: [],
  entities: {},
  reviewsStatus: LoadingStatus.Idle,
  commentStatus: LoadingStatus.Idle,
});

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
} = dataReviews.actions;
