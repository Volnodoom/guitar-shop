import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../utils/mock-faker';
import Cart from './cart';

describe('Component: Cart', () => {
  it('Render correctly when no items in cart', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/В корзине нет товаров/i)).toBeInTheDocument();
    expect(screen.getByText(/перейти в каталог товаров/i)).toBeInTheDocument();
  });
});
