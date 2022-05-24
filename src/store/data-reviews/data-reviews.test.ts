import thunk, { ThunkDispatch } from 'redux-thunk';
import { datatype, lorem } from 'faker';
import { ApiRoutes, LoadingStatus, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { createMockState, makeMockOneReviewWitId, makeMockReviewsArray, mockUserComment } from '../../utils/mock-faker';
import { addOneReview, dataReviews, fetchReviewsAction, initialState as initialStateReviews, saveCommentAction, setCommentStatus, setReviews } from './data-reviews';
import { State } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

const fakeNumber = datatype.number();
const fakeWord = lorem.word();
const ARRAY_LENGTH = 10;
const mockIds = Array.from({length: ARRAY_LENGTH}, () => String(datatype.number()));

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Store: DATA_REVIEWS', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataReviews.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialStateReviews);
    });

    it('setReviews -- update normalized data of reviews (lines ids and entities)', () => {
      const mockReviews = makeMockReviewsArray(ARRAY_LENGTH, mockIds);
      const mockEntity = mockIds
        .map((line, index) => ({[line]: mockReviews[index]}))
        .reduce((prev, current) => ({
          ...current,
          ...prev,
        }), {});

      expect(dataReviews.reducer(initialStateReviews, setReviews(mockReviews)))
        .toEqual({
          ...initialStateReviews,
          ids: mockIds,
          entities: mockEntity,
        });
    });

    it('addOneReview -- add ONE review to normalized data of reviews (lines ids and entities)', () => {
      const oneReview = makeMockOneReviewWitId(fakeWord);
      expect(dataReviews.reducer(initialStateReviews, addOneReview(oneReview)))
        .toEqual({
          ...initialStateReviews,
          ids: [fakeWord],
          entities: {[fakeWord]: oneReview}
        });
    });

    it('setCommentStatus -- set LoadingStatus to the line commentStatus of the store', () => {
      expect(dataReviews.reducer(initialStateReviews, setCommentStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateReviews,
          commentStatus: LoadingStatus.Succeeded,
        });
    });
  });

  describe('Check async actions', () => {
    it('fetchReviewsAction -- on success (200): UPDATE reviewsStatus with Success AND dispatch setReviews', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const serverResponse = makeMockReviewsArray(ARRAY_LENGTH, mockIds);

      const actionFulfilled = {
        type: fetchReviewsAction.fulfilled.type,
      };

      mockAPI
        .onGet(ApiRoutes.Reviews(fakeNumber))
        .reply(200, serverResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(fakeNumber));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setReviews.type);

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFulfilled).reviewsStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('fetchReviewsAction -- on pending: UPDATE reviewsStatus with Loading', () => {
      const mockState = createMockState();
      const actionPending = {
        type: fetchReviewsAction.pending.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionPending).reviewsStatus)
        .toEqual(LoadingStatus.Loading);
    });

    it('fetchReviewsAction -- on fail: UPDATE reviewsStatus with Failed', () => {
      const mockState = createMockState();
      const actionFail = {
        type: fetchReviewsAction.rejected.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFail).reviewsStatus)
        .toEqual(LoadingStatus.Failed);
    });

    it('saveCommentAction -- on success (200): UPDATE commentStatus with Success AND dispatch addOneReview', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const commentByUser = mockUserComment();
      const serverResponse = makeMockReviewsArray(ARRAY_LENGTH, mockIds);

      const actionFulfilled = {
        type: saveCommentAction.fulfilled.type,
      };

      mockAPI
        .onPost(ApiRoutes.PostComment)
        .reply(200, serverResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(saveCommentAction(commentByUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(addOneReview.type);


      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFulfilled).commentStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('saveCommentAction -- on loading: UPDATE commentStatus with Loading', () => {
      const mockState = createMockState();
      const actionPending = {
        type: saveCommentAction.pending.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionPending).commentStatus)
        .toEqual(LoadingStatus.Loading);
    });

    it('saveCommentAction -- on fail: UPDATE commentStatus with Failed', () => {
      const mockState = createMockState();
      const actionFail = {
        type: saveCommentAction.rejected.type,
      };

      expect(dataReviews.reducer(mockState[NameSpace.DataReviews], actionFail).commentStatus)
        .toEqual(LoadingStatus.Failed);
    });
  });
});
