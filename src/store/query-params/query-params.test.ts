import { datatype, lorem } from 'faker';
import { SortingOrder, SortingSort } from '../../const';
import { initialState, queryParams, setDataCoupled, setFilterByName, setFilterByType, setItemRangeEnd, setItemRangeStart, setOrderBy, setPriceRangeEnd, setPriceRangeStart, setSimilarName, setSortBy } from './query-params';

const mockString = lorem.word(1);
const mockNumber = datatype.number(1);
const stringForCouple = 'comments';

describe('Store: QUERY_PARAMS', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(queryParams.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
    });

    it('setFilterByName -- update line filterByName', () => {
      expect(queryParams.reducer(initialState, setFilterByName(mockString))).toEqual({
        ...initialState,
        filterByName: mockString,
      });
    });

    it('setFilterByType -- update line filterByType', () => {
      expect(queryParams.reducer(initialState, setFilterByType(mockString))).toEqual({
        ...initialState,
        filterByType: mockString,
      });
    });

    it('setSortBy -- update line sortBy', () => {
      expect(queryParams.reducer(initialState, setSortBy(SortingSort.Popularity))).toEqual({
        ...initialState,
        sortBy: SortingSort.Popularity,
      });
    });

    it('setOrderBy -- update line orderBy', () => {
      expect(queryParams.reducer(initialState, setOrderBy(SortingOrder.Decrease))).toEqual({
        ...initialState,
        orderBy: SortingOrder.Decrease,
      });
    });

    it('setItemRangeStart -- update line itemRangeStart', () => {
      expect(queryParams.reducer(initialState, setItemRangeStart(mockNumber))).toEqual({
        ...initialState,
        itemRangeStart: mockNumber,
      });
    });

    it('setItemRangeEnd -- update line itemRangeEnd', () => {
      expect(queryParams.reducer(initialState, setItemRangeEnd(mockNumber))).toEqual({
        ...initialState,
        itemRangeEnd: mockNumber,
      });
    });

    it('setPriceRangeStart -- update line priceRangeStart', () => {
      expect(queryParams.reducer(initialState, setPriceRangeStart(mockNumber))).toEqual({
        ...initialState,
        priceRangeStart: mockNumber,
      });
    });

    it('setPriceRangeEnd -- update line priceRangeEnd', () => {
      expect(queryParams.reducer(initialState, setPriceRangeEnd(mockNumber))).toEqual({
        ...initialState,
        priceRangeEnd: mockNumber,
      });
    });

    it('setSimilarName -- update line similarName', () => {
      expect(queryParams.reducer(initialState, setSimilarName(mockString))).toEqual({
        ...initialState,
        similarName: mockString,
      });
    });

    it('setDataCoupled -- update line dataCoupled', () => {
      expect(queryParams.reducer(initialState, setDataCoupled(stringForCouple))).toEqual({
        ...initialState,
        dataCoupled: stringForCouple,
      });
    });

  });
});
