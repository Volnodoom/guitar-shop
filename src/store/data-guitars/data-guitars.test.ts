import { datatype } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoutes, HEADER_TOTAL_NUMBER, LoadingStatus, NameSpace } from '../../const';
import { dataGuitars, fetchOneGuitarAction, fetchProductsAction, initialState as initialStateGuitars, setCurrentPage, setTotalGuitars } from '../data-guitars/data-guitars';
import { createAPI } from '../../services/api';
import { GuitarState, State } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { createMockState, makeMockGuitarArray, makeMockProducts, mockGuitar } from '../../utils/mock-faker';
import { setReviews } from '../data-reviews/data-reviews';

const fakeNumber = datatype.number();

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Store: DATA_GUITARS', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataGuitars.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialStateGuitars);
    });

    it('setTotalGuitars -- update state field: totalGuitars', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setTotalGuitars(fakeNumber)))
        .toEqual({...initialStateGuitars, totalGuitars: fakeNumber});
    });

    it('setCurrentPage -- update state field: currentPage', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setCurrentPage(fakeNumber)))
        .toEqual({...initialStateGuitars, currentPage: fakeNumber});
    });

  });

  describe('Check async actions', () => {
    it('fetchProductsAction -- on success (200): UPDATE state lines guitarsIdPerPage, guitarsStatus, and DISPATCH setReviews, setTotalGuitars', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const ARRAY_LENGTH = 10;
      const mockServerProductData = makeMockProducts(ARRAY_LENGTH);

      const ids = Array.from({length: ARRAY_LENGTH}, () => fakeNumber);
      const mockGuitars = makeMockGuitarArray(ARRAY_LENGTH, ids);

      const actionFulfilled = {
        type: fetchProductsAction.fulfilled.type,
        payload: mockGuitars,
      };

      mockAPI
        .onGet(ApiRoutes.Guitars)
        .reply(200, mockServerProductData, {
          [HEADER_TOTAL_NUMBER]: fakeNumber,
        });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchProductsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setTotalGuitars.type);
      expect(actions).toContain(setReviews.type);
      expect(actions).toContain(fetchProductsAction.fulfilled.type);

      expect(dataGuitars.reducer(store.getState()[NameSpace.DataGuitars] as GuitarState, actionFulfilled).guitarsIdPerPage)
        .toEqual({[mockState.DATA_GUITARS.currentPage]: ids});

      expect(dataGuitars.reducer(store.getState()[NameSpace.DataGuitars] as GuitarState, actionFulfilled).guitarsStatus)
        .toEqual(LoadingStatus.Succeeded);
    });

    it('fetchProductsAction -- on pending: update state guitarsStatus on loading', async () => {
      const mockState = createMockState();
      const actionLoading = {
        type: fetchProductsAction.pending.type,
      };

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], actionLoading))
        .toEqual({
          ...mockState[NameSpace.DataGuitars],
          guitarsStatus: LoadingStatus.Loading,
        });
    });

    it('fetchProductsAction -- on fail: update state guitarsStatus on failed', async () => {
      const mockState = createMockState();
      const action = {
        type: fetchProductsAction.rejected.type,
      };

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], action))
        .toEqual({
          ...mockState[NameSpace.DataGuitars],
          guitarsStatus: LoadingStatus.Failed,
        });
    });

    it('fetchOneGuitarAction -- on success: update state guitarsStatus on succeeded', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const serverResponse = mockGuitar();
      const action = {
        type: fetchOneGuitarAction.fulfilled.type,
        payload: serverResponse,
      };

      expect(dataGuitars.reducer(store.getState()[NameSpace.DataGuitars] as GuitarState, action).oneGuitarStatus)
        .toEqual(LoadingStatus.Succeeded);
    });

    it('fetchOneGuitarAction -- on pending: update state guitarsStatus on loading', async () => {
      const mockState = createMockState();
      const actionLoading = {
        type: fetchOneGuitarAction.pending.type,
      };

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], actionLoading))
        .toEqual({
          ...mockState[NameSpace.DataGuitars],
          oneGuitarStatus: LoadingStatus.Loading,
        });
    });

    it('fetchOneGuitarAction -- on fail: update state guitarsStatus on failed', async () => {
      const mockState = createMockState();
      const action = {
        type: fetchOneGuitarAction.rejected.type,
      };

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], action))
        .toEqual({
          ...mockState[NameSpace.DataGuitars],
          oneGuitarStatus: LoadingStatus.Failed,
        });
    });
  });

});
