import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, NameSpace } from '../../../../const';
import { createMockState } from '../../../../utils/mock-faker';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('render correctly when pages number more than 2', () => {
    const TOTAL_PAGES = 37;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_PAGES,
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: /1/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /2/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /3/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Далее/i})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Назад/i})).not.toBeInTheDocument();
  });

  it('render correctly when pages number equal to 2', () => {
    const TOTAL_PAGES = 15;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_PAGES,
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: /1/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /2/i})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /3/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Далее/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Назад/i})).not.toBeInTheDocument();
  });

  it('render correctly when pages number 1 or less', () => {
    const TOTAL_PAGES = 8;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_PAGES,
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('link', {name: /1/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /2/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Далее/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Назад/i})).not.toBeInTheDocument();
  });

  it('pressing pagination numbers lead to correct redirection according to link', async () => {
    const TOTAL_PAGES = 28;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_PAGES,
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/do/not/exist']}>
          <Routes>
            <Route path={AppRoutes.CatalogPageAbsolute(2)} element={<h1>Page 2</h1>} />
            <Route path={AppRoutes.NotExisted} element={<Pagination />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('link', {name: /2/i}));
    await waitFor(() => {expect(screen.getByText('Page 2')).toBeInTheDocument();});
  });

  it('pressing pagination button (Далее) lead to correct redirection from page 1 to page 2', async () => {
    const TOTAL_PAGES = 28;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_PAGES,
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/do/not/exist']}>
          <Routes>
            <Route path={AppRoutes.CatalogPageAbsolute(2)} element={<h1>Page 2</h1>} />
            <Route path={AppRoutes.NotExisted} element={<Pagination />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('link', {name: /Далее/i}));
    await waitFor(() => {expect(screen.getByText('Page 2')).toBeInTheDocument();});
  });

  it('pressing pagination button (Назад) lead to correct redirection from page 2 to page 1', async () => {
    const TOTAL_PAGES = 28;
    const PAGE_TWO = 2;
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        totalGuitars: TOTAL_PAGES,
        currentPage: PAGE_TWO,
      },
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/do/not/exist']}>
          <Routes>
            <Route path={AppRoutes.CatalogPageAbsolute(1)} element={<h1>Page 1</h1>} />
            <Route path={AppRoutes.NotExisted} element={<Pagination />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('link', {name: /Назад/i}));
    await waitFor(() => {expect(screen.getByText('Page 1')).toBeInTheDocument();});
  });
});
