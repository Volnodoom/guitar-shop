import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoadingStatus, NameSpace } from '../../../../const';
import { createMockState, mockGuitar } from '../../../../utils/mock-faker';
import Coupon from './coupon';
import { fetchCouponCheckAction } from '../../../../store/data-cart/action-cart';

jest.mock('../../../../store/data-cart/action-cart', () => ({
  fetchCouponCheckAction: jest.fn(),
}));

const mock = mockGuitar();
const NUMBER_OF_ITEMS = 10;
const PRICE_ITEM = 1020;

const fakeGuitar = {
  ...mock,
  price: PRICE_ITEM,
};

const mockState = createMockState();
const update = {
  ...mockState,
  [NameSpace.DataCart]: {
    ...mockState[NameSpace.DataCart],
    cartContentNumber: {[fakeGuitar.id]: NUMBER_OF_ITEMS},
    cartContent: [fakeGuitar],
  }
};

const mockStore = configureMockStore()(update);

describe('Component: Coupon', () => {
  it('Render correctly', () => {
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
    expect(screen.queryByText(/Промокод принят/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Применить'})).toBeInTheDocument();
  });

  it('Send request to server, when applying promo code', async () => {
    const mockStoreSpec = configureMockStore()(update);

    mockStoreSpec.dispatch = jest.fn();

    render(
      <Provider store={mockStoreSpec}>
        <MemoryRouter>
          <Coupon />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Введите промокод/i), 'ABCD');
    await userEvent.click(screen.getByRole('button', {name: 'Применить'}));

    expect(fetchCouponCheckAction).toHaveBeenCalledTimes(1);
    expect(fetchCouponCheckAction).toHaveBeenCalledWith({coupon: 'abcd'});
  });

  it('Inform on success coupon check', async () => {
    const updateSpec = {
      ...mockState,
      [NameSpace.DataCart]: {
        ...mockState[NameSpace.DataCart],
        cartContentNumber: {[fakeGuitar.id]: NUMBER_OF_ITEMS},
        cartContent: [fakeGuitar],
        couponStatus: LoadingStatus.Succeeded
      }
    };
    const mockStoreSpec = configureMockStore()(updateSpec);

    mockStoreSpec.dispatch = jest.fn();

    render(
      <Provider store={mockStoreSpec}>
        <MemoryRouter>
          <Coupon />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
  });

  it('Inform on fail coupon check', async () => {
    const updateSpec = {
      ...mockState,
      [NameSpace.DataCart]: {
        ...mockState[NameSpace.DataCart],
        cartContentNumber: {[fakeGuitar.id]: NUMBER_OF_ITEMS},
        cartContent: [fakeGuitar],
        couponStatus: LoadingStatus.Failed
      }
    };
    const mockStoreSpec = configureMockStore()(updateSpec);

    mockStoreSpec.dispatch = jest.fn();

    render(
      <Provider store={mockStoreSpec}>
        <MemoryRouter>
          <Coupon />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Неверный промокод/i)).toBeInTheDocument();
  });

  it('Changing button description during fetch request', async () => {
    const updateSpec = {
      ...mockState,
      [NameSpace.DataCart]: {
        ...mockState[NameSpace.DataCart],
        cartContentNumber: {[fakeGuitar.id]: NUMBER_OF_ITEMS},
        cartContent: [fakeGuitar],
        couponStatus: LoadingStatus.Loading
      }
    };
    const mockStoreSpec = configureMockStore()(updateSpec);

    mockStoreSpec.dispatch = jest.fn();

    render(
      <Provider store={mockStoreSpec}>
        <MemoryRouter>
          <Coupon />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Вычисляем .../i)).toBeInTheDocument();
  });
});
