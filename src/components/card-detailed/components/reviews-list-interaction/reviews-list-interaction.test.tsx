import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NameSpace } from '../../../../const';
import { EntityReviewType, Review } from '../../../../types/general.types';
import { createMockState, makeMockReviewsForSpecificGuitar } from '../../../../utils/mock-faker';
import { mockEntity } from '../../../../utils/utils-components';
import ReviewsListInteraction from './reviews-list-interaction';


describe('Component: ReviewListInteraction', () => {
  it('render correctly with comments more than 3', () => {
    const ITEMS_NUMBER = 12;
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
    const fakeReviewsData: Review[] = makeMockReviewsForSpecificGuitar(ITEMS_NUMBER, SPECIFIC_GUITAR_ID);
    const fakeReviewsEntities = mockEntity(fakeIds, fakeReviewsData) as EntityReviewType;

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        entities: fakeReviewsEntities,
        ids: fakeIds,
      }
    };

    const store = configureMockStore()(updatedState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ReviewsListInteraction onCreateReviewClick={fakeCallback}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Отзывы/i)).toHaveLength(2);
    expect(screen.getByRole('button', {name: /Оставить отзыв/i})).toBeInTheDocument();
    expect(screen.queryAllByText(/Достоинства/i)).toHaveLength(3);
    expect(screen.getByRole('button', {name: /Показать еще отзывы/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Наверх/i})).toBeInTheDocument();
  });

  it('render correctly with comments less than 3', () => {
    const ITEMS_NUMBER = 2;
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
    const fakeReviewsData: Review[] = makeMockReviewsForSpecificGuitar(ITEMS_NUMBER, SPECIFIC_GUITAR_ID);
    const fakeReviewsEntities = mockEntity(fakeIds, fakeReviewsData) as EntityReviewType;

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        entities: fakeReviewsEntities,
        ids: fakeIds,
      }
    };

    const store = configureMockStore()(updatedState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ReviewsListInteraction onCreateReviewClick={fakeCallback}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Отзывы/i)).toHaveLength(1);
    expect(screen.getByRole('button', {name: /Оставить отзыв/i})).toBeInTheDocument();
    expect(screen.queryAllByText(/Достоинства/i)).toHaveLength(ITEMS_NUMBER);
    expect(screen.queryByRole('button', {name: /Показать еще отзывы/i})).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Наверх/i})).toBeInTheDocument();
  });

  it('render correctly without comments', () => {
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();

    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ReviewsListInteraction onCreateReviewClick={fakeCallback}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Отзывы/i)).toHaveLength(1);
    expect(screen.getByRole('button', {name: /Оставить отзыв/i})).toBeInTheDocument();
    expect(screen.queryByText(/Достоинства/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Отзывов о данном товаре нет. Будь первым!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: /Показать еще отзывы/i})).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Наверх/i})).toBeInTheDocument();
  });

  it('click on button show more lead to showing extra 3 comments', async () => {
    const ITEMS_NUMBER = 12;
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();
    const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
    const fakeReviewsData: Review[] = makeMockReviewsForSpecificGuitar(ITEMS_NUMBER, SPECIFIC_GUITAR_ID);
    const fakeReviewsEntities = mockEntity(fakeIds, fakeReviewsData) as EntityReviewType;

    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        entities: fakeReviewsEntities,
        ids: fakeIds,
      }
    };

    const store = configureMockStore()(updatedState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ReviewsListInteraction onCreateReviewClick={fakeCallback}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /Показать еще отзывы/i}));
    await waitFor(() => {expect(screen.queryAllByText(/Достоинства/i)).toHaveLength(6);});
  });

  it('click on create Comment call for callback function', async () => {
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();

    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ReviewsListInteraction onCreateReviewClick={fakeCallback}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /Оставить отзыв/i}));
    await waitFor(() => {expect(fakeCallback).toHaveBeenCalledTimes(1);});
  });
});

