import { datatype, lorem } from 'faker';
import { LoadingStatus } from '../../const';
import { clearGuitarsIdPerPage, dataGuitars, initialState as initialStateGuitars, setActiveTab, setCurrentPage, setGuitarsDetails, setGuitarsIdPerPage, setGuitarsStatus, setOneGuitarDetails, setOneGuitarStatus, setPriceExtremes, setTotalGuitars } from '../data-guitars/data-guitars';
import { makeMockGuitarArray, makeMockOneGuitarWitId } from '../../utils/mock-faker';

const fakeNumber = datatype.number();
const fakeWord = lorem.word();

const ARRAY_LENGTH = 10;
const mockIds = Array.from({length: ARRAY_LENGTH}, () => datatype.number());
const mockGuitars = makeMockGuitarArray(ARRAY_LENGTH, mockIds);
const mockEntity = mockIds
  .map((line, index) => ({[line]: mockGuitars[index]}))
  .reduce((prev, current) => ({
    ...current,
    ...prev,
  }), {});

describe('Store: DATA_GUITARS', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataGuitars.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialStateGuitars);
    });

    it('setTotalGuitars -- update state field: totalGuitars', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setTotalGuitars(fakeNumber)))
        .toEqual({...initialStateGuitars, totalGuitars: fakeNumber});
    });

    it('setCurrentPage -- update state field: currentPage', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setCurrentPage(fakeNumber)))
        .toEqual({...initialStateGuitars, currentPage: fakeNumber});
    });

    it('setActiveTab -- update state field: activeTab', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setActiveTab(fakeWord)))
        .toEqual({...initialStateGuitars, activeTab: fakeWord});
    });

    it('setGuitarsDetails -- normalize data (by using RTK normalizer) for guitars and updating state field: ids and entities', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setGuitarsDetails(mockGuitars)))
        .toEqual({
          ...initialStateGuitars,
          ids: mockIds,
          entities: mockEntity,
        });
    });

    it('setOneGuitarDetails -- normalize data (by using RTK normalizer) for ONE guitar and updating state field: ids and entities', () => {
      const mockId = datatype.number();
      const mockOneGuitar = makeMockOneGuitarWitId(mockId);

      expect(dataGuitars.reducer(initialStateGuitars, setOneGuitarDetails(mockOneGuitar)))
        .toEqual({
          ...initialStateGuitars,
          ids: [mockId],
          entities: {[mockId]: mockOneGuitar},
        });
    });

    it('setGuitarsIdPerPage -- update state field: guitarsIdPerPage', () => {

      expect(dataGuitars.reducer(initialStateGuitars, setGuitarsIdPerPage(mockGuitars)))
        .toEqual({
          ...initialStateGuitars,
          guitarsIdPerPage: {
            1: mockIds,
          },
        });
    });

    it('clearGuitarsIdPerPage -- clear state field: guitarsIdPerPage to empty object', () => {
      const initialStateWithData = {
        ...initialStateGuitars,
        guitarsIdPerPage: {
          1: mockIds,
        },
      };

      expect(dataGuitars.reducer(initialStateWithData, clearGuitarsIdPerPage()))
        .toEqual(initialStateGuitars);
    });

    it('setGuitarsStatus -- update state field: guitarsStatus to any value from LoadingStatus type', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setGuitarsStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateGuitars,
          guitarsStatus: LoadingStatus.Succeeded,
        });
    });

    it('setOneGuitarStatus -- update state field: oneGuitarStatus to any value from LoadingStatus type', () => {
      expect(dataGuitars.reducer(initialStateGuitars, setOneGuitarStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateGuitars,
          oneGuitarStatus: LoadingStatus.Succeeded,
        });
    });

    it('setPriceExtremes -- update state field: priceExtremes to object with two parameters min and max values of each of them is a number', () => {
      const update = {
        min: fakeNumber,
        max: fakeNumber,
      };

      expect(dataGuitars.reducer(initialStateGuitars, setPriceExtremes(update)))
        .toEqual({
          ...initialStateGuitars,
          priceExtremes: update,
        });
    });
  });
});
