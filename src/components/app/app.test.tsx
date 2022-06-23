import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes, LoadingStatus, NameSpace, ONE } from '../../const';
import { EntityGuitarType, EntityReviewType, Review } from '../../types/general.types';
import { createMockState, makeMockGuitarArray, makeMockReviewsForSpecificGuitar } from '../../utils/mock-faker';
import { mockEntity } from '../../utils/utils-components';
import CardDetailed from '../card-detailed/card-detailed';
import Cart from '../cart/cart';
import Catalog from '../catalog/catalog';
import Layout from '../layout/layout';
import PageOnError from '../page-on-error/page-on-error';

const TOTAL_NUMBER = 19;
const ITEMS_NUMBER = 9;
//default value of initial page
const PAGE_NUMBER = 1;
const mockState = createMockState();

const fakeGuitarIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
const fakeGuitarData = makeMockGuitarArray(ITEMS_NUMBER, fakeGuitarIds);
const fakeGuitarsEntities = mockEntity(fakeGuitarIds, fakeGuitarData) as EntityGuitarType;
const specificGuitarId = fakeGuitarIds[0];
const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
const fakeReviewsData: Review[] = makeMockReviewsForSpecificGuitar(ITEMS_NUMBER, specificGuitarId);
const fakeReviewsEntities = mockEntity(fakeIds, fakeReviewsData) as EntityReviewType;

const updatedState = {
  ...mockState,
  [NameSpace.DataGuitars]: {
    ...mockState[NameSpace.DataGuitars],
    totalGuitars: TOTAL_NUMBER,
    priceExtremes: {
      min: 100,
      max: 300,
    },
    guitarsStatus: LoadingStatus.Succeeded,
    oneGuitarStatus: LoadingStatus.Succeeded,
    priceStatus: LoadingStatus.Succeeded,
    guitarsIdPerPage: {[PAGE_NUMBER]: fakeGuitarIds},
    entities: fakeGuitarsEntities,
    ids: fakeGuitarIds,
  },
  [NameSpace.DataReviews]: {
    ...mockState[NameSpace.DataReviews],
    entities: fakeReviewsEntities,
    ids: fakeIds,
    reviewsStatus: LoadingStatus.Succeeded,
  }
};
const store = configureMockStore()(updatedState);


describe('Component: App', () => {
  it('render catalog page on url address /', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.PseudoRoot} replace/>}/>
            <Route path={AppRoutes.PseudoRoot} element={<Layout />}>
              <Route index element={<Navigate to={AppRoutes.CatalogPage(ONE)} replace/>} />
              <Route path={AppRoutes.CatalogPage()} element={<Catalog />} />
              <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
              <Route path={AppRoutes.Cart} element={<Cart />} />
            </Route>
            <Route path={AppRoutes.NotExisted} element={<PageOnError />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('render catalog page on url address /catalog', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Routes>
            <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.PseudoRoot} replace/>}/>
            <Route path={AppRoutes.PseudoRoot} element={<Layout />}>
              <Route index element={<Navigate to={AppRoutes.CatalogPage(ONE)} replace/>} />
              <Route path={AppRoutes.CatalogPage()} element={<Catalog />} />
              <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
              <Route path={AppRoutes.Cart} element={<Cart />} />
            </Route>
            <Route path={AppRoutes.NotExisted} element={<PageOnError />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('render detailed card info on url address /catalog/guitar/:id', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/catalog/guitar/${specificGuitarId}`]}>
          <Routes>
            <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.PseudoRoot} replace/>}/>
            <Route path={AppRoutes.PseudoRoot} element={<Layout />}>
              <Route index element={<Navigate to={AppRoutes.CatalogPage(ONE)} replace/>} />
              <Route path={AppRoutes.CatalogPage()} element={<Catalog />} />
              <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
              <Route path={AppRoutes.Cart} element={<Cart />} />
            </Route>
            <Route path={AppRoutes.NotExisted} element={<PageOnError />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/^Товар$/i)).toBeInTheDocument();
  });

  it('render cart info on url address /catalog/cart', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog/cart']}>
          <Routes>
            <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.PseudoRoot} replace/>}/>
            <Route path={AppRoutes.PseudoRoot} element={<Layout />}>
              <Route index element={<Navigate to={AppRoutes.CatalogPage(ONE)} replace/>} />
              <Route path={AppRoutes.CatalogPage()} element={<Catalog />} />
              <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
              <Route path={AppRoutes.Cart} element={<Cart />} />
            </Route>
            <Route path={AppRoutes.NotExisted} element={<PageOnError />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Корзина/i)).toHaveLength(2);
  });

  it('render not available page on nonexisting url address', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog/sdf/cart']}>
          <Routes>
            <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.PseudoRoot} replace/>}/>
            <Route path={AppRoutes.PseudoRoot} element={<Layout />}>
              <Route index element={<Navigate to={AppRoutes.CatalogPage(ONE)} replace/>} />
              <Route path={AppRoutes.CatalogPage()} element={<Catalog />} />
              <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
              <Route path={AppRoutes.Cart} element={<Cart />} />
            </Route>
            <Route path={AppRoutes.NotExisted} element={<PageOnError />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

});
