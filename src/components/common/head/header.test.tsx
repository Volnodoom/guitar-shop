import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMockState, mockGuitar } from '../../../utils/mock-faker';
import Header from './header';
import { AppRoutes, LoadingStatus, NameSpace, SEARCH_BAR_PLACEHOLDER } from '../../../const';
import { fetchUserSearchAction, setOneGuitarStatus, setUserSearch } from '../../../store/data-guitars/data-guitars';
import { setReviewsStatus } from '../../../store/data-reviews/data-reviews';
import { State } from '../../../types/state.types';

jest.mock('../../../store/data-guitars/data-guitars', () => ({
  ...jest.requireActual('../../../store/data-guitars/data-guitars'),
  fetchUserSearchAction: jest.fn(() => ({
    ...mockGuitar(),
    name: 'LaLaLa',
    id: 10,
  })),
  setActiveTab: jest.fn(),
  setOneGuitarStatus: jest.fn(),
  setReviewsStatus: jest.fn(),
}));


describe('Component: header', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищите?/i)).toBeInTheDocument();
    expect(screen.getByTestId(/icon-basket/i)).toBeInTheDocument();
  });

  it('Typing guitar name in search bar make a fetch request with this value to server for check', async () => {
    const NAME_FAKE = 'CURT';

    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    mockStore.dispatch = jest.fn();
    jest.useFakeTimers();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(SEARCH_BAR_PLACEHOLDER), NAME_FAKE);
    await waitFor(() => {expect(fetchUserSearchAction).toHaveBeenCalledWith(NAME_FAKE);});
  });

  it('Typing guitar name does not dispatch action, when it has the same sequence of alphabet from the first call and the first call return nothing', async () => {
    const NAME_FAKE = 'CURT';

    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    mockStore.dispatch = jest.fn();
    jest.useFakeTimers();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(SEARCH_BAR_PLACEHOLDER), NAME_FAKE);
    await waitFor(() => {expect(fetchUserSearchAction).toHaveBeenCalledWith(NAME_FAKE);});
    await waitFor(() => {expect(screen.getByText(/Товаров не найдено/i)).toBeInTheDocument();});
    await (() => {userEvent.type(screen.getByText(NAME_FAKE), 'CURTT');});
    await waitFor(() => {expect(fetchUserSearchAction).not.toHaveBeenCalledWith('CURTT');});
  });

  it('Pressing Esc clean input search, when input search bar is focused', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    mockStore.dispatch = jest.fn();
    jest.useFakeTimers();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(mockStore.getActions()).toEqual([]);

    screen.getByPlaceholderText(SEARCH_BAR_PLACEHOLDER).focus();
    userEvent.keyboard('{Escape}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setUserSearch([]));});
  });

  it('Pressing Enter on product result of the search address you to the product page', async () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        userGuitarSearch: [
          {
            ...mockGuitar(),
            name: 'LaLaLa',
            id: 10,
          }
        ]
      }

    };
    const mockStore = configureMockStore()(updatedState);
    mockStore.dispatch = jest.fn();
    jest.useFakeTimers();

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<Header />}/>
            <Route path={`${AppRoutes.GuitarAbsolute(10)}`} element={<h2>Correct redirection</h2>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    screen.getByText(/LaLaLa/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(screen.getByText(/Correct redirection/i)).toBeInTheDocument();});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setOneGuitarStatus(LoadingStatus.Idle));});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setReviewsStatus(LoadingStatus.Idle));});
  });
});
