import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoadingStatus, NameSpace } from '../../const';
import { EntityReviewType, GuitarType, Review } from '../../types/general.types';
import { createMockState, makeMockOneGuitarWitId, makeMockReviewsForSpecificGuitar } from '../../utils/mock-faker';
import { mockEntity } from '../../utils/utils-components';
import CardDetailed from './card-detailed';

const SPECIFIC_GUITAR_ID = 5;
const ITEMS_NUMBER = 10;
const PRICE = 25634;

const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
const fakeReviewsData: Review[] = makeMockReviewsForSpecificGuitar(ITEMS_NUMBER, SPECIFIC_GUITAR_ID);
const fakeReviewsEntities = mockEntity(fakeIds, fakeReviewsData) as EntityReviewType;

const fakeGuitarData: GuitarType = {
  ...makeMockOneGuitarWitId(SPECIFIC_GUITAR_ID),
  price: PRICE,
};
const fakeGuitarEntities = {[SPECIFIC_GUITAR_ID]: fakeGuitarData};

describe('Component: CardDetailed', () => {
  it('Render correctly', () => {
    const SUCCESS = LoadingStatus.Succeeded;

    const mockState = createMockState();

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        reviewsStatus: SUCCESS,
        entities: fakeReviewsEntities,
        ids: fakeIds,
      },
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
        oneGuitarStatus: SUCCESS,
      },
    };

    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<CardDetailed />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Товар/i)).toBeInTheDocument();
    expect(screen.getByAltText(fakeGuitarData.name)).toBeInTheDocument();
    expect(screen.getAllByText(fakeGuitarData.name)).toHaveLength(2);
    expect(screen.getByText(/Всего оценок/i)).toBeInTheDocument();
    expect(screen.getByText(ITEMS_NUMBER)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/25 634/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Добавить в корзину/i})).toBeInTheDocument();
  });

  it('Display loading when data is loading', () => {
    const LOADING = LoadingStatus.Loading;

    const mockState = createMockState();

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        reviewsStatus: LOADING,
        entities: fakeReviewsEntities,
        ids: fakeIds,
      },
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        oneGuitarStatus: LOADING,
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
      },
    };

    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<CardDetailed />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('Display not Available when guitar id is not find in database', () => {
    const FAILED = LoadingStatus.Failed;

    const mockState = createMockState();

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        reviewsStatus: FAILED,
      },
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        oneGuitarStatus: FAILED,
      },
    };

    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<CardDetailed />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('Click on button Add-To-Cart calls for Modal window', async () => {
    const SUCCESS = LoadingStatus.Succeeded;

    const mockState = createMockState();

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        reviewsStatus: SUCCESS,
        entities: fakeReviewsEntities,
        ids: fakeIds,
      },
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
        oneGuitarStatus: SUCCESS,
      },
    };

    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<CardDetailed />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /Добавить в корзину/i}));
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
