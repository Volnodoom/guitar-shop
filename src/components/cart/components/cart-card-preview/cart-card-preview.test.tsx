import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../../../const';
import { createMockState, mockGuitar } from '../../../../utils/mock-faker';
import CartCardPreview from './cart-card-preview';
import { updateCartContentNumber } from '../../../../store/data-cart/data-cart';

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

describe('Component: CartCardPreview', () => {
  it('Render correctly', () => {
    const fakeSetModalFrame = jest.fn();
    const fakeSetGuitar = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CartCardPreview guitarInfo={fakeGuitar} setModalFrame={fakeSetModalFrame} setGuitar={fakeSetGuitar}/>
        </MemoryRouter>
      </Provider>
    );

    const stringsDescription = `${fakeGuitar.stringCount} струнная`;

    expect(screen.getByRole('button', {name: 'Удалить'})).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(fakeGuitar.name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeGuitar.name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeGuitar.vendorCode, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(stringsDescription, 'i'))).toBeInTheDocument();

    expect(screen.getByText(/1 020/i)).toBeInTheDocument();
    expect(screen.getByText(/10 200/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(NUMBER_OF_ITEMS)).toBeInTheDocument();

    expect(screen.getByRole('button', {name: 'Уменьшить количество'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Увеличить количество'})).toBeInTheDocument();
  });

  it('Click on buttons -- call for actions', async () => {
    const mockStoreSpec = configureMockStore()(update);

    const fakeSetModalFrame = jest.fn();
    const fakeSetGuitar = jest.fn();
    mockStoreSpec.dispatch = jest.fn();

    render(
      <Provider store={mockStoreSpec}>
        <MemoryRouter>
          <CartCardPreview guitarInfo={fakeGuitar} setModalFrame={fakeSetModalFrame} setGuitar={fakeSetGuitar}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: 'Удалить'}));
    await waitFor(() => expect(fakeSetModalFrame).toBeCalledTimes(1));
    await waitFor(() => expect(fakeSetGuitar).toBeCalledTimes(1));

    userEvent.click(screen.getByRole('button', {name: 'Уменьшить количество'}));
    await waitFor(() => expect(mockStoreSpec.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStoreSpec.dispatch).toHaveBeenCalledWith(updateCartContentNumber({id: String(fakeGuitar.id), value: NUMBER_OF_ITEMS - 1})));
    expect(screen.getByPlaceholderText(NUMBER_OF_ITEMS - 1)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: 'Увеличить количество'}));
    await waitFor(() => expect(mockStoreSpec.dispatch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(mockStoreSpec.dispatch).toHaveBeenCalledWith(updateCartContentNumber({id: String(fakeGuitar.id), value: NUMBER_OF_ITEMS + 1})));
    expect(screen.getByPlaceholderText(NUMBER_OF_ITEMS + 1)).toBeInTheDocument();
  });

  it('Change input -- update store', async () => {
    const mockStoreSpec = configureMockStore()(update);

    const fakeSetModalFrame = jest.fn();
    const fakeSetGuitar = jest.fn();
    mockStoreSpec.dispatch = jest.fn();

    render(
      <Provider store={mockStoreSpec}>
        <MemoryRouter>
          <CartCardPreview guitarInfo={fakeGuitar} setModalFrame={fakeSetModalFrame} setGuitar={fakeSetGuitar}/>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: '20'}});
    await waitFor(() => expect(mockStoreSpec.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStoreSpec.dispatch).toHaveBeenCalledWith(updateCartContentNumber({id: String(fakeGuitar.id), value: 20})));
    expect(screen.getByPlaceholderText(20)).toBeInTheDocument();
  });
});
