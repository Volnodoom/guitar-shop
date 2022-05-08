import { NameSpace } from '../../const';
import { State } from '../../types/state.types';
import { rtkSelectorsGuitars } from './data-guitars';

export const {
  selectAll: getGuitars,
  selectById,
} = rtkSelectorsGuitars;

export const getOneGuitar = (id: number) => (state: State) => selectById(state, id);
export const getGuitarsStatus = (state: State) => state[NameSpace.DataGuitars].guitarsStatus;
export const getOneGuitarStatus = (state: State) => state[NameSpace.DataGuitars].oneGuitarStatus;

