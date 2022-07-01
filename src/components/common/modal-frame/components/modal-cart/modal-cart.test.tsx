import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter} from 'react-router-dom';
import { ModalKind } from '../../../../../const';
import { createMockState, mockGuitar } from '../../../../../utils/mock-faker';
import ModalCart from './modal-cart';

const SPECIFIC_PRICE = 40507;
const guitarData = {
  ...mockGuitar(),
  price: SPECIFIC_PRICE,
};

const mockState = createMockState();
const mockStore = configureMockStore()(mockState);

describe('Component: Modal-Cart', () => {
  it('Render correctly by default Add-Cart-Modal', () => {
    const fakeAddFunction = jest.fn();
    const fakeCloseFunction = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalCart
            guitarDetails={guitarData}
            onAdd={fakeAddFunction}
            onClose={fakeCloseFunction}
            modalType={ModalKind.CartAdd}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByAltText(guitarData.name)).toBeInTheDocument();
    expect(screen.getByText(guitarData.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(guitarData.vendorCode, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/40 507/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(guitarData.stringCount), 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Добавить в корзину/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toBeInTheDocument();
  });

  it('Render correctly by Delete-Cart-Modal', () => {
    const fakeDeleteFunction = jest.fn();
    const fakeCloseFunction = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalCart
            guitarDetails={guitarData}
            onDelete={fakeDeleteFunction}
            onClose={fakeCloseFunction}
            modalType={ModalKind.CartDelete}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByAltText(guitarData.name)).toBeInTheDocument();
    expect(screen.getByText(guitarData.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(guitarData.vendorCode, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/40 507/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(guitarData.stringCount), 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Удалить товар/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Продолжить покупки/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toBeInTheDocument();
  });

  it('Click on any button of Add-Cart-Modal lead to call of callback functions', async () => {
    const fakeAddFunction = jest.fn();
    const fakeCloseFunction = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalCart
            guitarDetails={guitarData}
            onAdd={fakeAddFunction}
            onClose={fakeCloseFunction}
            modalType={ModalKind.CartAdd}
          />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /Добавить в корзину/i}));
    expect(fakeAddFunction).toBeCalledTimes(1);
    await userEvent.click(screen.getByRole('button', {name: /Закрыть/i}));
    expect(fakeCloseFunction).toBeCalledTimes(1);
  });

  it('Click on any button of Delete-Cart-Modal lead to call of callback functions', async () => {
    const fakeDeleteFunction = jest.fn();
    const fakeCloseFunction = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalCart
            guitarDetails={guitarData}
            onDelete={fakeDeleteFunction}
            onClose={fakeCloseFunction}
            modalType={ModalKind.CartDelete}
          />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /Удалить товар/i}));
    await userEvent.click(screen.getByRole('button', {name: /Продолжить покупки/i}));
    await userEvent.click(screen.getByRole('button', {name: /Закрыть/i}));
    expect(fakeDeleteFunction).toBeCalledTimes(1);
    expect(fakeCloseFunction).toBeCalledTimes(3);
  });

  it('Focus trap work on Add-Cart-Modal component', () => {
    const fakeAddFunction = jest.fn();
    const fakeCloseFunction = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalCart
            guitarDetails={guitarData}
            onAdd={fakeAddFunction}
            onClose={fakeCloseFunction}
            modalType={ModalKind.CartAdd}
          />
        </MemoryRouter>
      </Provider>
    );

    userEvent.tab();
    expect(screen.getByRole('button', {name: /Добавить в корзину/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Добавить в корзину/i})).toHaveFocus();
  });

  it('Focus trap work on Delete-Cart-Modal component', () => {
    const fakeDeleteFunction = jest.fn();
    const fakeCloseFunction = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalCart
            guitarDetails={guitarData}
            onDelete={fakeDeleteFunction}
            onClose={fakeCloseFunction}
            modalType={ModalKind.CartDelete}
          />
        </MemoryRouter>
      </Provider>
    );

    userEvent.tab();
    expect(screen.getByRole('button', {name: /Удалить товар/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Продолжить покупки/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Удалить товар/i})).toHaveFocus();
  });
});
