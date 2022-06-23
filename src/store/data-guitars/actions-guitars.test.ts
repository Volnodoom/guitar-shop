import { datatype, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoutes, HEADER_TOTAL_NUMBER, LoadingStatus, NameSpace, ONE, QueryRoutes, SortingOrder, SortingSort } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { createMockState, makeMockGuitarArray, makeMockProducts, mockGuitar } from '../../utils/mock-faker';
import { setReviews } from '../data-reviews/data-reviews';
import { GuitarType } from '../../types/general.types';
import { fetchOneGuitarAction, fetchPriceExtreme, fetchProductsAction, fetchUserSearchAction } from './actions-guitars';
import { dataGuitars, setGuitarsDetails, setGuitarsIdPerPage, setOneGuitarDetails, setPriceExtremes, setTotalGuitars, setUserSearch } from './data-guitars';

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

describe('Actions Guitars', () => {
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
      const action = {
        type: fetchPriceExtreme.fulfilled.type,
      };

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
      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], action).priceStatus)
        .toBe(LoadingStatus.Succeeded);
    });

    it('fetchPriceExtreme -- on pending: update state priceStatus with loading', async () => {
      const mockState = createMockState();
      const actionLoading = {
        type: fetchPriceExtreme.pending.type,
      };

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], actionLoading))
        .toEqual({
          ...mockState[NameSpace.DataGuitars],
          priceStatus: LoadingStatus.Loading,
        });
    });

    it('fetchPriceExtreme -- on fail: update state priceStatus with fail', async () => {
      const mockState = createMockState();
      const action = {
        type: fetchPriceExtreme.rejected.type,
      };

      expect(dataGuitars.reducer(mockState[NameSpace.DataGuitars], action))
        .toEqual({
          ...mockState[NameSpace.DataGuitars],
          priceStatus: LoadingStatus.Failed,
        });
    });
  });
});
