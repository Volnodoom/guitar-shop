import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../../../../const';
import { createMockState } from '../../../../../utils/mock-faker';
import HeaderCart from './header-cart';

describe('Component: Header-Cart', () => {
  it('Render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <HeaderCart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: 'Корзина'})).toBeInTheDocument();
    expect(screen.getByTestId(/icon-basket/i)).toBeInTheDocument();
  });

  it('Display quantity of items in cart according to the number in store', () => {
    const mockState = createMockState();
    const update = {
      ...mockState,
      [NameSpace.DataCart] : {
        ...mockState[NameSpace.DataCart],
        cartContentNumber: {'1': 10},
      }
    };
    const mockStore = configureMockStore()(update);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <HeaderCart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
