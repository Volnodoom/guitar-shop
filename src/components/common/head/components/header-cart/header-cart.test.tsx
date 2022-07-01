import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, NameSpace } from '../../../../../const';
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

  it('Click on the Icon redirect to the cart', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path={'/'} element={<HeaderCart />}/>
            <Route path={AppRoutes.CartAbsolute} element={<h1>Correct redirection</h1>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link', {name: 'Корзина'}));
    expect(screen.getByText(/Correct redirection/i)).toBeInTheDocument();
  });
});
