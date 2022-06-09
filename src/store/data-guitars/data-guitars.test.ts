import { datatype, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoutes, HEADER_TOTAL_NUMBER, LoadingStatus, NameSpace, ONE, QueryRoutes, SortingOrder, SortingSort } from '../../const';
import { clearGuitarsIdPerPage, dataGuitars, fetchOneGuitarAction, fetchPriceExtreme, fetchProductsAction, fetchUserSearchAction, initialState as initialStateGuitars, setActiveTab, setCurrentPage, setGuitarsDetails, setGuitarsIdPerPage, setGuitarsStatus, setOneGuitarDetails, setOneGuitarStatus, setPriceExtremes, setTotalGuitars, setUserSearch } from '../data-guitars/data-guitars';
import { createAPI } from '../../services/api';
import { State } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { createMockState, makeMockGuitarArray, makeMockOneGuitarWitId, makeMockProducts, mockGuitar } from '../../utils/mock-faker';
import { setReviews } from '../data-reviews/data-reviews';
import { GuitarType } from '../../types/general.types';

const fakeNumber = datatype.number();
const fakeWord = lorem.word();

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const oneGuitar = mockGuitar();

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

    it('clearGuitarsIdPerPage -- clear state field: guitarsIdPerPage to empty object', () => {
      const initialStateWithData = {
        ...initialStateGuitars,
        guitarsIdPerPage: {
          1: mockIds,
        },
      };

      expect(dataGuitars.reducer(initialStateWithData, clearGuitarsIdPerPage()))
        .toEqual(initialStateGuitars);
    });

    it('setGuitarsStatus -- update state field: guitarsStatus to any value from LoadingStatus type', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setGuitarsStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateGuitars,
          guitarsStatus: LoadingStatus.Succeeded,
        });
    });

    it('setOneGuitarStatus -- update state field: oneGuitarStatus to any value from LoadingStatus type', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setOneGuitarStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateGuitars,
          oneGuitarStatus: LoadingStatus.Succeeded,
        });
    });

    it('setPriceExtremes -- update state field: priceExtremes to object with two parameters min and max values of each of them is a number', () => {
      const update = {
        min: fakeNumber,
        max: fakeNumber,
      };

      expect(dataGuitars.reducer(initialStateGuitars, setPriceExtremes(update)))
        .toEqual({
          ...initialStateGuitars,
          priceExtremes: update,
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
      const action = {
        type: fetchOneGuitarAction.fulfilled.type,
      };

      mockAPI
        .onGet(ApiRoutes.Guitar(fakeNumber))
        .reply(200, oneGuitar);

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

    it('fetchUserSearchAction -- on success (200): UPDATE state line userGuitarSearch with data and DISPATCH setUserSearch', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);
      const mockServerResponse = mockGuitars;

      mockAPI
        .onGet(ApiRoutes.Guitars, {params: {
          [QueryRoutes.Like]: fakeWord,
        }})
        .reply(200, mockServerResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchUserSearchAction(fakeWord));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setUserSearch.type);
    });

    it('fetchPriceExtreme -- on success (200): UPDATE state line priceExtremes with object of two parameters min amd max, which values are numbers, and DISPATCH setPriceExtremes', async () => {
      const mockState = createMockState();
      const store = mockStore(mockState);

      const extremes = {
        min: 1000,
        max: 5000,
      };

      const mockServerResponseMin: GuitarType = {
        ...oneGuitar,
        price: extremes.min,
      };
      const mockServerResponseMax: GuitarType = {
        ...oneGuitar,
        price: extremes.max,
      };

      mockAPI
        .onGet(ApiRoutes.Guitars, {params: {
          [QueryRoutes.Start]: 0,
          [QueryRoutes.Limit]: ONE,
          [QueryRoutes.Sort]: SortingSort.Price,
          [QueryRoutes.Order]: SortingOrder.Increase,
        }})
        .replyOnce(200, mockServerResponseMin)
        .onGet(ApiRoutes.Guitars, {
          params: {
            [QueryRoutes.Start]: 0,
            [QueryRoutes.Limit]: ONE,
            [QueryRoutes.Sort]: SortingSort.Price,
            [QueryRoutes.Order]: SortingOrder.Decrease,
          }
        })
        .replyOnce(200, mockServerResponseMax);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchPriceExtreme());

      const actions = store.getActions().map(({type}) => type);
      expect(actions).toContain(setPriceExtremes.type);
    });
  });
});
