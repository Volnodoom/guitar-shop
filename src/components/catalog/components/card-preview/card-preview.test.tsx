import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, NameSpace } from '../../../../const';
import { GuitarType } from '../../../../types/general.types';
import { createMockState, makeMockReviewsForSpecificGuitar, mockGuitar } from '../../../../utils/mock-faker';
import { mockEntity } from '../../../../utils/utils-components';
import CardPreview from './card-preview';

const ARRAY_LENGTH = 5;
const SPECIFIC_PRICE = 40520;
const IDENTIFICATION = 11;

const guitarData: GuitarType = {
  ...mockGuitar(),
  price: SPECIFIC_PRICE,
  id: IDENTIFICATION,
};

const reviews = makeMockReviewsForSpecificGuitar(ARRAY_LENGTH, guitarData.id);
const fakeIds = Array.from({length: ARRAY_LENGTH}, () => String(datatype.number()));
const reviewsEntities = mockEntity(fakeIds, reviews);

const mockState = createMockState();
const updatedState = {
  ...mockState,
  [NameSpace.DataReviews]: {
    ...mockState[NameSpace.DataReviews],
    ids: fakeIds,
    entities: reviewsEntities,
  }
};

const store = configureMockStore()(updatedState);

describe('Component: CardPreview', () => {
  it('Render correctly', () => {
    const nameWithDotAtTheEnd = `${guitarData.name}.`;
    const fakeIsModalActive = jest.fn();
    const fakeSetGuitar = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardPreview setModalFrame={fakeIsModalActive} setGuitar={fakeSetGuitar} itemInfo={guitarData} />
        </MemoryRouter>
      </Provider>
    );

    const reviewNumber = screen.getByTestId('review-number');

    expect(screen.getByAltText(nameWithDotAtTheEnd)).toBeInTheDocument();
    expect(within(reviewNumber).getByText(ARRAY_LENGTH)).toBeInTheDocument();
    expect(screen.getByText(guitarData.name)).toBeInTheDocument();
    expect(screen.getByText(/40 520/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });

  it('Click on link "More Details" redirect to the detailed page', async () => {
    //due to scrollIntoView is not implemented in jsdom. It is working by manually adding it.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function() {};

    const fakeIsModalActive = jest.fn();
    const fakeSetGuitar = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path={AppRoutes.NotExisted} element={<CardPreview setModalFrame={fakeIsModalActive} setGuitar={fakeSetGuitar} itemInfo={guitarData} />} />
            <Route path={AppRoutes.GuitarAbsolute(IDENTIFICATION)} element={<h1>Correct redirection</h1>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('link', {name: /Подробнее/i}));
    await waitFor(() => {
      expect(screen.getByText(/Correct redirection/i )).toBeInTheDocument();
    });
  });

  it('Click on link "Purchase" call modal window', async () => {
    //due to scrollIntoView is not implemented in jsdom. It is working by manually adding it.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function() {};

    const fakeIsModalActive = jest.fn();
    const fakeSetGuitar = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path={AppRoutes.NotExisted} element={<CardPreview setModalFrame={fakeIsModalActive} setGuitar={fakeSetGuitar} itemInfo={guitarData} />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /Купить/i}));
    expect(fakeIsModalActive).toHaveBeenCalledTimes(1);
    expect(fakeSetGuitar).toHaveBeenCalledTimes(1);
  });

  it('Click on link "In cart" call redirect to cart', async () => {
    //due to scrollIntoView is not implemented in jsdom. It is working by manually adding it.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function() {};

    const updatedStateSpec = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        ids: fakeIds,
        entities: reviewsEntities,
      },
      [NameSpace.DataCart]: {
        ...mockState[NameSpace.DataCart],
        cartContent: [guitarData],
        cartContentNumber: {[guitarData.id]: 20},
      }
    };

    const storeSpec = configureMockStore()(updatedStateSpec);

    const fakeIsModalActive = jest.fn();
    const fakeSetGuitar = jest.fn();

    render(
      <Provider store={storeSpec}>
        <MemoryRouter>
          <Routes>
            <Route path={AppRoutes.NotExisted} element={<CardPreview setModalFrame={fakeIsModalActive} setGuitar={fakeSetGuitar} itemInfo={guitarData} />} />
            <Route path={AppRoutes.CartAbsolute} element={<h1>On cart page</h1>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link', {name: /В Корзине/i}));
    expect(screen.getByText(/On cart page/i )).toBeInTheDocument();
  });
});
