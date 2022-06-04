import { NameSpace } from '../../const';
import { State } from '../../types/state.types';

export const getItemStart = (state: State) => state[NameSpace.QueryParams].itemRangeStart;
export const getSort = (state: State) => state[NameSpace.QueryParams].sortBy;
export const getOrder = (state: State) => state[NameSpace.QueryParams].orderBy;
export const getPriceRangeStart = (state: State) => state[NameSpace.QueryParams].priceRangeStart;
export const getPriceRangeEnd = (state: State) => state[NameSpace.QueryParams].priceRangeEnd;
export const getSimilarName = (state: State) => state[NameSpace.QueryParams].similarName;
export const getFilterByName = (state: State) => state[NameSpace.QueryParams].filterByName;
export const getFilterByType = (state: State) => state[NameSpace.QueryParams].filterByType;


