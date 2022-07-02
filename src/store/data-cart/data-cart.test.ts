import { LoadingStatus } from '../../const';
import { mockGuitar } from '../../utils/mock-faker';
import { addCartContent, dataCart, initialState as initialStateCart, removeCartContent, removeCartContentNumber, setCouponStatus, updateCartContentNumber, updateCoupon } from './data-cart';

const fakeGuitar = mockGuitar();

describe('Store: DATA_CART', () => {
  it('unknown action -- return initial state', () => {
    expect(dataCart.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialStateCart);
  });

  it('addCartContent -- add product to cartContent store position', () => {
    expect(dataCart.reducer(initialStateCart, addCartContent(fakeGuitar))).toEqual({
      ...initialStateCart,
      cartContent: [fakeGuitar],
    });
  });

  it('removeCartContent -- remove product from cartContent store position', () => {
    const changedInitialState = {
      ...initialStateCart,
      cartContent: [fakeGuitar],
    };

    expect(dataCart.reducer(changedInitialState, removeCartContent({guitarId: fakeGuitar.id}))).toEqual({
      ...initialStateCart,
    });
  });

  it('updateCartContentNumber -- add object with id and number of items to cartContentNumber of store position', () => {
    expect(dataCart.reducer(initialStateCart, updateCartContentNumber({id: String(fakeGuitar.id), value: 10}))).toEqual({
      ...initialStateCart,
      cartContentNumber: {[String(fakeGuitar.id)]: 10},
    });
  });

  it('removeCartContentNumber -- remove object with id and number of items from cartContentNumber of store position', () => {
    const changedInitialState = {
      ...initialStateCart,
      cartContentNumber: {[String(fakeGuitar.id)]: 10},
    };

    expect(dataCart.reducer(changedInitialState, removeCartContentNumber({guitarId: fakeGuitar.id}))).toEqual({
      ...initialStateCart,
    });
  });

  it('updateCoupon -- add coupon number to coupon line of store position', () => {
    expect(dataCart.reducer(initialStateCart, updateCoupon(25))).toEqual({
      ...initialStateCart,
      coupon: 25,
    });
  });

  it('setCouponStatus -- update state field: couponStatus to any value from LoadingStatus type', () => {
    expect(dataCart.reducer(initialStateCart, setCouponStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...initialStateCart,
        couponStatus: LoadingStatus.Succeeded,
      });
  });
});
