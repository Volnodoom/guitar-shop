import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { CartContentNumber } from '../../types/general.types';
import { State } from '../../types/state.types';

export const getCartContent = (state: State) => state[NameSpace.DataCart].cartContent;
export const getCoupon = (state: State) => state[NameSpace.DataCart].coupon;
export const getCartContentNumbers = (state: State) => state[NameSpace.DataCart].cartContentNumber;

export const getTotalCartContentNumber = createSelector(
  getCartContentNumbers,
  (totalNumber) => {
    const hasItems = totalNumber !== null;

    if(hasItems) {
      return  Object.values(totalNumber as CartContentNumber)
        .reduce((prevValue, curValue) => prevValue + curValue, 0);
    } else {
      return null;
    }
  });

export const getCartQuantityForCurrentProduct = createSelector(
  [
    getCartContentNumbers,
    (state: State, id: number | undefined) => id,
  ],
  (content, id) => {
    if(content && id) {
      const isIdInContent = Object.keys(content).some((line) => line === String(id));
      if(isIdInContent) {
        return content[id];
      } else {
        return 0;
      }
    } else if(id) {
      return 0;
    } else {
      return null;
    }
  }
);
