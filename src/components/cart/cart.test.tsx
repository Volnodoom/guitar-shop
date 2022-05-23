import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../utils/mock-faker';
import Cart from './cart';


describe('Component: CartCardPreview', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/Корзина/i)).toBeInTheDocument();
  });
});
