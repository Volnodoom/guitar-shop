import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Sorting from './sorting';
import { createMockState } from '../../../../utils/mock-faker';
import { clearGuitarsIdPerPage } from '../../../../store/data-guitars/data-guitars';
import { setOrderBy, setSortBy } from '../../../../store/query-params/query-params';
import { SortingOrder, SortingSort } from '../../../../const';


describe('Component: Sorting', () => {
  it('Render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Sorting />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по цене/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по популярности/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /По возрастанию/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /По убыванию/i})).toBeInTheDocument();
  });

  it('Press on sorting according to the price automatically add sorting decreasing', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Sorting />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /по цене/i}));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(mockStore.dispatch).toBeCalledWith(clearGuitarsIdPerPage()));
    await waitFor(() => expect(mockStore.dispatch).toBeCalledWith(setSortBy(SortingSort.Price)));
    await waitFor(() => expect(mockStore.dispatch).toBeCalledWith(setOrderBy(SortingOrder.Decrease)));
  });

  it('Press on oder up automatically add sorting by price', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Sorting />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /По возрастанию/i}));
    await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(mockStore.dispatch).toBeCalledWith(clearGuitarsIdPerPage()));
    await waitFor(() => expect(mockStore.dispatch).toBeCalledWith(setSortBy(SortingSort.Price)));
    await waitFor(() => expect(mockStore.dispatch).toBeCalledWith(setOrderBy(SortingOrder.Increase)));
  });
});
