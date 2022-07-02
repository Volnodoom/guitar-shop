import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoutes, LoadingStatus, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { createMockState } from '../../utils/mock-faker';
import { fetchCouponCheckAction } from './action-cart';
import { dataCart, updateCoupon } from './data-cart';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Actions Cart', () => {
  it('fetchCouponCheckAction -- on success (200): UPDATE state line couponStatus with success and DISPATCH updateCoupon action', async () => {
    const mockState = createMockState();
    const store = mockStore(mockState);
    const couponInfo = {coupon: 'qsdpo8'};

    const actionFulfilled = {
      type: fetchCouponCheckAction.fulfilled.type,
    };

    mockAPI
      .onPost(ApiRoutes.PostCoupon)
      .reply(200, 25);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCouponCheckAction(couponInfo));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(updateCoupon.type);
    expect(actions).toContain(fetchCouponCheckAction.fulfilled.type);

    expect(dataCart.reducer(mockState[NameSpace.DataCart], actionFulfilled).couponStatus)
      .toBe(LoadingStatus.Succeeded);
  });

  it('fetchCouponCheckAction -- on pending: update state couponStatus with loading', async () => {
    const mockState = createMockState();
    const actionLoading = {
      type: fetchCouponCheckAction.pending.type,
    };

    expect(dataCart.reducer(mockState[NameSpace.DataCart], actionLoading))
      .toEqual({
        ...mockState[NameSpace.DataCart],
        couponStatus: LoadingStatus.Loading,
      });
  });

  it('fetchCouponCheckAction -- on fail: update state couponStatus with fail', async () => {
    const mockState = createMockState();
    const action = {
      type: fetchCouponCheckAction.rejected.type,
    };

    expect(dataCart.reducer(mockState[NameSpace.DataCart], action))
      .toEqual({
        ...mockState[NameSpace.DataCart],
        couponStatus: LoadingStatus.Failed,
      });
  });
});
