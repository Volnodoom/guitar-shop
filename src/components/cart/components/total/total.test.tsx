import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../../../const';
import { createMockState, mockGuitar } from '../../../../utils/mock-faker';
import Total from './total';

const mock = mockGuitar();
const NUMBER_OF_ITEMS = 10;
const PRICE_ITEM = 1020;

const fakeGuitar = {
  ...mock,
  price: PRICE_ITEM,
};

const mockState = createMockState();

describe('Component: Total', () => {
  it('Render correctly without coupon', () => {
    const update = {
      ...mockState,
      [NameSpace.DataCart]: {
        ...mockState[NameSpace.DataCart],
        cartContentNumber: {[fakeGuitar.id]: NUMBER_OF_ITEMS},
        cartContent: [fakeGuitar],
      }
    };

    const mockStore = configureMockStore()(update);

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
    expect(screen.getAllByText(/10 200/i)).toHaveLength(2);
    expect(screen.getByRole('button', {name: 'Оформить заказ'})).toBeInTheDocument();
  });

  it('Render correctly with coupon', () => {
    const update = {
      ...mockState,
      [NameSpace.DataCart]: {
        ...mockState[NameSpace.DataCart],
        cartContentNumber: {[fakeGuitar.id]: NUMBER_OF_ITEMS},
        cartContent: [fakeGuitar],
        coupon: 50,
      }
    };

    const mockStore = configureMockStore()(update);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Total />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByText(/10 200/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате/i)).toBeInTheDocument();
    expect(screen.getAllByText(/5 100/i)).toHaveLength(2);
    expect(screen.getByRole('button', {name: 'Оформить заказ'})).toBeInTheDocument();
  });

  it('Render correctly without any cart item', () => {
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
    expect(screen.getAllByText(/0/i)).toHaveLength(3);
    expect(screen.getByRole('button', {name: 'Оформить заказ'})).toBeInTheDocument();
  });
});
