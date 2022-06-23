import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoadingStatus, NameSpace } from '../../const';
import { EntityGuitarType } from '../../types/general.types';
import { createMockState, makeMockGuitarArray } from '../../utils/mock-faker';
import { mockEntity } from '../../utils/utils-components';
import Catalog from './catalog';


describe('Component: Catalog', () => {
  it('Render correctly with data', () => {
    const PAGE_NUMBER = 2;
    const TOTAL_NUMBER = 19;
    const ITEMS_NUMBER = 9;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
    const fakeGuitarData = makeMockGuitarArray(ITEMS_NUMBER, fakeIds);
    const fakeGuitarsEntities = mockEntity(fakeIds, fakeGuitarData) as EntityGuitarType;

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_NUMBER,
        currentPage: PAGE_NUMBER,
        guitarsStatus: LoadingStatus.Succeeded,
        guitarsIdPerPage: {[PAGE_NUMBER]: fakeIds},
        entities: fakeGuitarsEntities,
        ids: fakeIds,
        priceExtremes: {
          min: 100,
          max: 500,
        }
      }
    };
    const store = configureMockStore()(updatedState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/page/${PAGE_NUMBER}`]}>
          <Routes>
            <Route path='page/:pageNumber' element={<Catalog />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );


    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    //due to useSetCatalogPageState dispatch call two times and price component dispatch call one time
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(screen.queryAllByRole('link', {name: /Подробнее/i})).toHaveLength(ITEMS_NUMBER);
  });

  it('render correctly without data', () => {
    const PAGE_NUMBER = 1;
    const ITEMS_NUMBER = 9;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: ITEMS_NUMBER,
        guitarsStatus: LoadingStatus.Succeeded,
        guitarsIdPerPage: {[PAGE_NUMBER]: fakeIds},
        ids:[fakeIds],
        priceExtremes: {
          min: 100,
          max: 500,
        }
      }
    };
    const store = configureMockStore()(updatedState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/page/${PAGE_NUMBER}`]}>
          <Routes>
            <Route path='page/:pageNumber' element={<Catalog />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Товаров по вашему запросу не найдено/i)).toBeInTheDocument();
  });

  it('render correctly, when data is loading', () => {
    const PAGE_NUMBER = 2;
    const TOTAL_NUMBER = 19;
    const ITEMS_NUMBER = 9;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_NUMBER,
        currentPage: PAGE_NUMBER,
        guitarsStatus: LoadingStatus.Loading,
        guitarsIdPerPage: {[PAGE_NUMBER]: fakeIds},
        ids: fakeIds,
        priceExtremes: {
          min: 100,
          max: 500,
        }
      }
    };
    const store = configureMockStore()(updatedState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/page/${PAGE_NUMBER}`]}>
          <Routes>
            <Route path='page/:pageNumber' element={<Catalog />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('render correctly, when you address to non existing page', () => {
    const PAGE_NUMBER = 200;
    const TOTAL_NUMBER = 19;
    const ITEMS_NUMBER = 9;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_NUMBER,
        currentPage: PAGE_NUMBER,
        guitarsStatus: LoadingStatus.Succeeded,
        guitarsIdPerPage: {[PAGE_NUMBER]: fakeIds},
        ids: fakeIds,
        priceExtremes: {
          min: 100,
          max: 500,
        }
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/page/${PAGE_NUMBER}`]}>
          <Routes>
            <Route path='page/:pageNumber' element={<Catalog />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
