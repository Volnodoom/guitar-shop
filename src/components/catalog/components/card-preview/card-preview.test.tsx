import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, NameSpace } from '../../../../const';
import { createMockState, makeMockReviewsForSpecificGuitar, mockGuitar } from '../../../../utils/mock-faker';
import { mockEntity } from '../../../../utils/utils-components';
import CardPreview from './card-preview';

const ARRAY_LENGTH = 5;
const SPECIFIC_PRICE = 40520;

describe('Component: CardPreview', () => {
  it('render correctly', () => {
    const guitarData = {
      ...mockGuitar(),
      price: SPECIFIC_PRICE,
    };

    const reviews = makeMockReviewsForSpecificGuitar(ARRAY_LENGTH, guitarData.id);
    const fakeIds = Array.from({length: ARRAY_LENGTH}, () => String(datatype.number()));
    const reviewsEntities = mockEntity(fakeIds, reviews);
    const nameWithDotAtTheEnd = `${guitarData.name}.`;

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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardPreview itemInfo={guitarData} />
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

  it('click on link redirect on accurate page', async () => {
    //due to scrollIntoView is not implemented in jsdom. It is working by manually adding it.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function() {};
    const IDENTIFICATION = 1;
    const guitarData = {
      ...mockGuitar(),
      id: IDENTIFICATION,
    };
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const NOT_PAGE = '/this/page/does/not/exist';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[NOT_PAGE]}>
          <Routes>
            <Route path={AppRoutes.NotExisted} element={<CardPreview itemInfo={guitarData} />} />
            <Route path={AppRoutes.GuitarAbsolute(IDENTIFICATION)} element={<Link to={NOT_PAGE}>On product details page</Link>} />
            <Route path={AppRoutes.CartAbsolute} element={<h1>On cart page</h1>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('link', {name: /Подробнее/i}));
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /On product details page/i })).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('link', {name: /On product details page/i}));
    await waitFor(() => {screen.getByRole('link', { name: /Купить/i });});


    userEvent.click(screen.getByRole('link', {name: /Купить/i}));
    await waitFor(() => {
      expect(screen.getByText(/On cart page/i)).toBeInTheDocument();
    });
  });
});
