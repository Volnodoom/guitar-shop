import { datatype } from 'faker';
import { LoadingStatus, NameSpace } from '../../const';
import { createMockState, makeMockReviewsArray, mockReview } from '../../utils/mock-faker';
import { dataReviews, fetchReviewsAction, initialState as initialStateReviews, saveCommentAction } from './data-reviews';

const fakeNumber = datatype.number();

describe('Store: DATA_REVIEWS', () => {
  describe('Check sliceREducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataReviews.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialStateReviews);
    });
  });

  describe('Check async actions', () => {
    it('fetchReviewsAction -- on success (200): UPDATE reviewsStatus on Success', () => {
      const mockState = createMockState();
      const ARRAY_LENGTH = 10;
      const ids = Array.from({length: ARRAY_LENGTH}, () => fakeNumber);
      const serverResponse = makeMockReviewsArray(ARRAY_LENGTH, ids);

      const actionFulfilled = {
        type: fetchReviewsAction.fulfilled.type,
        payload: serverResponse,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFulfilled).reviewsStatus)
        .toEqual(LoadingStatus.Succeeded);
    });

    it('fetchReviewsAction -- on pending: UPDATE reviewsStatus on Loading', () => {
      const mockState = createMockState();
      const actionPending = {
        type: fetchReviewsAction.pending.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionPending).reviewsStatus)
        .toEqual(LoadingStatus.Loading);
    });

    it('fetchReviewsAction -- on fail: UPDATE reviewsStatus on Failed', () => {
      const mockState = createMockState();
      const actionFail = {
        type: fetchReviewsAction.rejected.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFail).reviewsStatus)
        .toEqual(LoadingStatus.Failed);
    });

    it('saveCommentAction -- on success (200): UPDATE commentStatus on Success', () => {
      const mockState = createMockState();
      const serverResponse = mockReview();

      const actionFulfilled = {
        type: saveCommentAction.fulfilled.type,
        payload: serverResponse,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFulfilled).commentStatus)
        .toEqual(LoadingStatus.Succeeded);
    });

    it('saveCommentAction -- on fail: UPDATE commentStatus on Loading', () => {
      const mockState = createMockState();
      const actionPending = {
        type: saveCommentAction.pending.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionPending).commentStatus)
        .toEqual(LoadingStatus.Loading);
    });

    it('saveCommentAction -- on fail: UPDATE commentStatus on Failed', () => {
      const mockState = createMockState();
      const actionFail = {
        type: saveCommentAction.rejected.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFail).commentStatus)
        .toEqual(LoadingStatus.Failed);
    });
  });
});
