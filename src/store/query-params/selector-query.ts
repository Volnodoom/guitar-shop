import { NameSpace } from '../../const';
import { State } from '../../types/state.types';

export const getItemStart = (state: State) => state[NameSpace.QueryParams].itemRangeStart;
export const getSort = (state: State) => state[NameSpace.QueryParams].sortBy;
export const getOrder = (state: State) => state[NameSpace.QueryParams].orderBy;

