import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../../utils/mock-faker';
import Header from './header';
import { SEARCH_BAR_PLACEHOLDER } from '../../../const';
import { fetchUserSearchAction } from '../../../store/data-guitars/data-guitars';

jest.mock('../../../store/data-guitars/data-guitars', () => ({
  ...jest.requireActual('../../../store/data-guitars/data-guitars'),
  fetchUserSearchAction: jest.fn()
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

});
