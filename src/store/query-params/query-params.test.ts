import { datatype, lorem } from 'faker';
import { SortingOrder, SortingSort } from '../../const';
import {
  addFilterByString,
  addFilterByType,
  clearQueryParams,
  initialState,
  queryParams,
  removeFilterByString,
  removeFilterByType,
  setDataCoupled,
  setItemRangeEnd,
  setItemRangeStart,
  setOrderBy,
  setPriceRangeEnd,
  setPriceRangeStart,
  setSortBy
} from './query-params';

const mockString = lorem.word(1);
const mockNumber = datatype.number(1);
const stringForCouple = 'comments';


describe('Store: QUERY_PARAMS', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(queryParams.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
    });

    it('addFilterByString -- add number to array of filterByString store position', () => {
      expect(queryParams.reducer(initialState, addFilterByString(mockNumber))).toEqual({
        ...initialState,
        filterByString: [mockNumber],
      });
    });

    it('addFilterByString -- prevent adding number  to array of filterByString store position if this data is already presented', () => {
      const updateInitialState = {
        ...initialState,
        filterByString: [mockNumber],
      };

      expect(queryParams.reducer(updateInitialState, addFilterByString(mockNumber))).toEqual({
        ...initialState,
        filterByString: [mockNumber],
      });
    });

    it('removeFilterByString -- remove element from array of filterByString store position if this element exist in store', () => {
      const updateInitialState = {
        ...initialState,
        filterByString: [mockNumber],
      };

      expect(queryParams.reducer(updateInitialState, removeFilterByString(mockNumber))).toEqual({
        ...initialState,
        filterByString: [],
      });
      expect(queryParams.reducer(updateInitialState, removeFilterByString(5))).toEqual({
        ...initialState,
        filterByString: [mockNumber],
      });
    });

    it('addFilterByType -- add string data to array of filterByType store position', () => {
      expect(queryParams.reducer(initialState, addFilterByType(mockString))).toEqual({
        ...initialState,
        filterByType: [mockString],
      });
    });

    it('addFilterByType -- prevent adding string data to array of filterByType store position if this data is already presented', () => {
      const updateInitialState = {
        ...initialState,
        filterByType: [mockString],
      };

      expect(queryParams.reducer(updateInitialState, addFilterByType(mockString))).toEqual({
        ...initialState,
        filterByType: [mockString],
      });
    });

    it('removeFilterByType -- remove element from array of filterByType store position if this element exist in store', () => {
      const updateInitialState = {
        ...initialState,
        filterByType: [mockString],
      };

      expect(queryParams.reducer(updateInitialState, removeFilterByType(mockString))).toEqual({
        ...initialState,
        filterByType: [],
      });
      expect(queryParams.reducer(updateInitialState, removeFilterByType('mockString'))).toEqual({
        ...initialState,
        filterByType: [mockString],
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


    it('setDataCoupled -- update line dataCoupled', () => {
      expect(queryParams.reducer(initialState, setDataCoupled(stringForCouple))).toEqual({
        ...initialState,
        dataCoupled: stringForCouple,
      });
    });

    it('clearQueryParams -- reset all state to null or empty array except for the lines itemRangeStart, itemRangeEnd, dataCoupled', () => {
      const updateInitialState = {
        ...initialState,
        filterByString: [mockNumber],
        filterByType: [mockString],
        priceRangeStart: mockNumber,
        priceRangeEnd: mockNumber,
        sortBy: SortingSort.Popularity,
        orderBy: SortingOrder.Decrease,
      };

      expect(queryParams.reducer(updateInitialState, clearQueryParams())).toEqual({
        ...initialState,
        filterByString: [],
        filterByType: [],
        priceRangeStart: null,
        priceRangeEnd: null,
        sortBy: null,
        orderBy: null,
      });
    });
  });
});
