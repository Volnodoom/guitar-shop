import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../../../utils/mock-faker';
import Total from './total';

describe('Component: Total', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Total />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Оформить заказ'})).toBeInTheDocument();
  });

});
