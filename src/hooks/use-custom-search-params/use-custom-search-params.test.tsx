import { renderHook } from '@testing-library/react-hooks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../utils/mock-faker';
import React, {FC} from 'react';
import { AppRoutes, KindOfGuitars, NameSpace, SortingOrder, SortingSort } from '../../const';
import { useCustomSearchParams } from './use-custom-search-params';
import { waitFor } from '@testing-library/react';
import { addFilterByString, addFilterByType, setOrderBy, setPriceRangeEnd, setPriceRangeStart, setSortBy } from '../../store/query-params/query-params';
import { removeObjectPropertyWithNull } from '../../utils/utils-components';

const FAKE_PAGE = 5;
const expectedResult = {
  '_sort': 'rating',
  '_order': 'asc',
  'price_gte': '1000',
  'price_lte': '4000',
  'type': ['ukulele'],
  'stringCount': ['4'],
};

jest.mock('../../utils/utils-components', () => ({
  ...jest.requireActual('../../utils/utils-components'),
  removeObjectPropertyWithNull: jest.fn(() => (expectedResult))
}));

describe('Custom hook: use-custom-search-params', () => {
  it('Dispatch setSortBy action, when user input search params related to sort by price', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    const CUSTOM_PARAM = '_sort=price';

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}?${CUSTOM_PARAM}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(setSortBy(SortingSort.Price)));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(setOrderBy(SortingOrder.Decrease)));
  });

  it('Dispatch setOrderBy action, when user input search params related to decreasing order', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    const CUSTOM_PARAM = '_order=desc';

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}?${CUSTOM_PARAM}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(setOrderBy(SortingOrder.Decrease)));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(setSortBy(SortingSort.Price)));
  });

  it('Dispatch setPriceRangeStart action, when user input search params related to min price limit', async () => {
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 1000,
          max: 5000,
        }
      }
    };
    const mockStore = configureMockStore()(updatedState);
    const CUSTOM_PARAM = 'price_gte=3000';

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}?${CUSTOM_PARAM}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(setPriceRangeStart(3000)));
  });

  it('Dispatch setPriceRangeEnd action, when user input search params related to max price limit', async () => {
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 1000,
          max: 5000,
        }
      }
    };
    const mockStore = configureMockStore()(updatedState);
    const CUSTOM_PARAM = 'price_lte=4000';

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}?${CUSTOM_PARAM}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(setPriceRangeEnd(4000)));
  });

  it('Dispatch addFilterByType action, when user input search params related to ukulele guitar type', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    const CUSTOM_PARAM = 'type=ukulele';

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}?${CUSTOM_PARAM}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(addFilterByType(KindOfGuitars.Ukulele)));
  });

  it('Dispatch addFilterByString action, when user input search params related to number of strings', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    const CUSTOM_PARAM = 'stringCount=4';

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}?${CUSTOM_PARAM}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(addFilterByString(4)));
  });

  it('Update url, according to user choices based on store state', async () => {
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByString: [4],
        filterByType: [KindOfGuitars.Ukulele],
        sortBy: SortingSort.Popularity,
        orderBy: SortingOrder.Increase,
        priceRangeStart: 1000,
        priceRangeEnd: 4000,
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper});

    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(removeObjectPropertyWithNull).toHaveBeenCalledWith(expectedResult));
  });

  it('Update url, according to user choices based on store state, when user go to another pages', async () => {
    const NEW_FAKE_PAGE = 10;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByString: [4],
        filterByType: [KindOfGuitars.Ukulele],
        sortBy: SortingSort.Popularity,
        orderBy: SortingOrder.Increase,
        priceRangeStart: 1000,
        priceRangeEnd: 4000,
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    const wrapper1: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(FAKE_PAGE)}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );

    const wrapper2: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`${AppRoutes.CatalogPageAbsolute(NEW_FAKE_PAGE)}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    renderHook(() => useCustomSearchParams(), {wrapper : wrapper1});
    renderHook(() => useCustomSearchParams(), {wrapper: wrapper2});


    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(removeObjectPropertyWithNull).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(removeObjectPropertyWithNull).toHaveBeenLastCalledWith(expectedResult));
  });

});
