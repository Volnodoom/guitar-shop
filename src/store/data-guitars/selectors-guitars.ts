import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { State } from '../../types/state.types';
import { rtkSelectorsGuitars } from './data-guitars';

export const {
  selectAll: getGuitars,
  selectById,
} = rtkSelectorsGuitars;

export const getOneGuitar = (id: number) => (state: State) => selectById(state, id);
export const getTotalNumber = (state: State) => state[NameSpace.DataGuitars].totalGuitars;
export const getIdsGuitarsPerPage = (state: State) => state[NameSpace.DataGuitars].guitarsIdPerPage;
export const getCurrentPage = (state: State) => state[NameSpace.DataGuitars].currentPage;
export const getGuitarsStatus = (state: State) => state[NameSpace.DataGuitars].guitarsStatus;
export const getOneGuitarStatus = (state: State) => state[NameSpace.DataGuitars].oneGuitarStatus;

export const getGuitarsPerPage = createSelector(
  getCurrentPage,
  getIdsGuitarsPerPage,
  (state: State) => (id: number) => selectById(state, id),
  (page, ids, getGuitar) => {
    const guitarsId = ids[page];

    if (!guitarsId) {
      return undefined;
    } else {
      return guitarsId.map((lineId) => getGuitar(lineId));
    }
  }
);
