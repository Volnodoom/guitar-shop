import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../../../utils/mock-faker';
import CartCardPreview from './cart-card-preview';

describe('Component: CartCardPreview', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CartCardPreview />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', {name: 'Удалить'})).toBeInTheDocument();
    expect(screen.getByAltText(/ЭлектроГитара Честер bass/i)).toBeInTheDocument();
    expect(screen.getByText(/ЭлектроГитара Честер bass/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул: SO757575/i)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитара, 6 струнная/i)).toBeInTheDocument();
    expect(screen.getAllByText(/17 500/i)).toHaveLength(2);
    expect(screen.getByRole('button', {name: 'Уменьшить количество'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Увеличить количество'})).toBeInTheDocument();
  });
});
