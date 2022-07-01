import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter} from 'react-router-dom';
import { createMockState } from '../../../utils/mock-faker';
import Header from './header';

jest.mock('../../../store/data-guitars/data-guitars', () => ({
  ...jest.requireActual('../../../store/data-guitars/data-guitars'),
  fetchUserSearchAction: jest.fn(),
  setActiveTab: jest.fn(),
  setOneGuitarStatus: jest.fn(),
  setReviewsStatus: jest.fn(),
}));

describe('Component: Header', () => {
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
});
