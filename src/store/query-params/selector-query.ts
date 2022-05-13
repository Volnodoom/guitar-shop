import { NameSpace } from '../../const';
import { State } from '../../types/state.types';

export const getItemStart = (state: State) => state[NameSpace.QueryParams].itemRangeStart;
