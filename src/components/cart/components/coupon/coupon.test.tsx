import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../../../utils/mock-faker';
import Coupon from './coupon';

describe('Component: Coupon', () => {
  it('Render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Coupon />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Применить'})).toBeInTheDocument();
  });

});
