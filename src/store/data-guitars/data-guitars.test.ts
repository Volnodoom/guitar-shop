import { datatype, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoutes, HEADER_TOTAL_NUMBER, LoadingStatus, NameSpace } from '../../const';
import { dataGuitars, fetchOneGuitarAction, fetchProductsAction, initialState as initialStateGuitars, setActiveTab, setCurrentPage, setGuitarsDetails, setGuitarsIdPerPage, setOneGuitarDetails, setTotalGuitars } from '../data-guitars/data-guitars';
import { createAPI } from '../../services/api';
import { State } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { createMockState, makeMockGuitarArray, makeMockOneGuitarWitId, makeMockProducts, mockGuitar } from '../../utils/mock-faker';
import { setReviews } from '../data-reviews/data-reviews';

const fakeNumber = datatype.number();
const fakeWord = lorem.word();

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const ARRAY_LENGTH = 10;
const mockIds = Array.from({length: ARRAY_LENGTH}, () => datatype.number());
const mockGuitars = makeMockGuitarArray(ARRAY_LENGTH, mockIds);
const mockEntity = mockIds
  .map((line, index) => ({[line]: mockGuitars[index]}))
  .reduce((prev, current) => ({
    ...current,
    ...prev,
  }), {});

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

    it('setActiveTab -- update state field: activeTab', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setActiveTab(fakeWord)))
        .toEqual({...initialStateGuitars, activeTab: fakeWord});
    });

    it('setGuitarsDetails -- normalize data (by using RTK normalizer) for guitars and updating state field: ids and entities', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setGuitarsDetails(mockGuitars)))
        .toEqual({
          ...initialStateGuitars,
          ids: mockIds,
          entities: mockEntity,
        });
    });

    it('setOneGuitarDetails -- normalize data (by using RTK normalizer) for ONE guitar and updating state field: ids and entities', () => {
      const mockId = datatype.number();
      const mockOneGuitar = makeMockOneGuitarWitId(mockId);

      expect(dataGuitars.reducer(initialStateGuitars, setOneGuitarDetails(mockOneGuitar)))
        .toEqual({
          ...initialStateGuitars,
          ids: [mockId],
          entities: {[mockId]: mockOneGuitar},
        });
    });

    it('setGuitarsIdPerPage -- update state field: guitarsIdPerPage', () => {

      expect(dataGuitars.reducer(initialStateGuitars, setGuitarsIdPerPage(mockGuitars)))
        .toEqual({
          ...initialStateGuitars,
          guitarsIdPerPage: {
            1: mockIds,
          },
        });
    });
  });

  describe('Check async actions', () => {
    it('fetchProductsAction -- on success (200): UPDATE state line guitarsStatus with success and DISPATCH setReviews, setTotalGuitars, setGuitarsIdPerPage, setGuitarsDetails', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const mockServerProductData = makeMockProducts(ARRAY_LENGTH);

      const actionFulfilled = {
        type: fetchProductsAction.fulfilled.type,
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
      expect(actions).toContain(setGuitarsDetails.type);
      expect(actions).toContain(setGuitarsIdPerPage.type);
      expect(actions).toContain(fetchProductsAction.fulfilled.type);

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], actionFulfilled).guitarsStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('fetchProductsAction -- on pending: update state guitarsStatus with loading', async () => {
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

    it('fetchProductsAction -- on fail: update state guitarsStatus with fail', async () => {
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

    it('fetchOneGuitarAction -- on success (200): update state guitarsStatus with success AND dispatch setOneGuitarDetails', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const serverResponse = mockGuitar();
      const action = {
        type: fetchOneGuitarAction.fulfilled.type,
      };

      mockAPI
        .onGet(ApiRoutes.Guitar(fakeNumber))
        .reply(200, serverResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchOneGuitarAction(fakeNumber));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setOneGuitarDetails.type);
      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], action).oneGuitarStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('fetchOneGuitarAction -- on pending: update state guitarsStatus with loading', async () => {
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

    it('fetchOneGuitarAction -- on fail: update state guitarsStatus with fail', async () => {
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
