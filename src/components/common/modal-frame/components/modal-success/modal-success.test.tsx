import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes, ModalKind, PAGE, PRODUCT } from '../../../../../const';
import { createMockState } from '../../../../../utils/mock-faker';
import ModalSuccess from './modal-success';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Component: ModalSuccess', () => {
  it('Render correctly by default Modal-Cart-Success', () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalSuccess modalType={ModalKind.Cart} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Перейти в корзину/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Продолжить покупки/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/Закрыть/i)).toBeInTheDocument();
  });

  it('Render correctly by default Modal-Review-Success', () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalSuccess modalType={ModalKind.Review} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /К покупкам!/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/Закрыть/i)).toBeInTheDocument();
  });

  it('Click on Modal-Cart-Success buttons call for correct functions when it is PRODUCT detailed page', async () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${PRODUCT}`]}>
          <ModalSuccess modalType={ModalKind.Cart} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /Перейти в корзину/i}));
    await userEvent.click(screen.getByRole('button', {name: /Продолжить покупки/i}));
    await userEvent.click(screen.getByLabelText(/Закрыть/i));

    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenNthCalledWith(1, AppRoutes.CartAbsolute);
    expect(mockedNavigate).toHaveBeenNthCalledWith(2, '/catalog/page/1');
    expect(fakeCallback).toHaveBeenCalledTimes(3);
  });

  it('Click on Modal-Cart-Success buttons call for correct functions when it is CATALOG page', async () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${PAGE}`]}>
          <ModalSuccess modalType={ModalKind.Cart} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /Перейти в корзину/i}));
    await userEvent.click(screen.getByRole('button', {name: /Продолжить покупки/i}));
    await userEvent.click(screen.getByLabelText(/Закрыть/i));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(AppRoutes.CartAbsolute);
    expect(fakeCallback).toHaveBeenCalledTimes(3);
  });

  it('Click on Modal-Review-Success buttons call for correct functions', async () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalSuccess modalType={ModalKind.Review} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', {name: /К покупкам!/i}));
    await userEvent.click(screen.getByLabelText(/Закрыть/i));

    expect(fakeCallback).toHaveBeenCalledTimes(2);
  });

  it('Focus trap work on Modal-Cart-Success component', () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${PAGE}`]}>
          <ModalSuccess modalType={ModalKind.Cart} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.tab();
    expect(screen.getByRole('button', {name: /Перейти в корзину/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Продолжить покупки/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Перейти в корзину/i})).toHaveFocus();
  });

  it('Focus trap work on Modal-Review-Success component', () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalSuccess modalType={ModalKind.Review} onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.tab();
    expect(screen.getByRole('button', {name: /К покупкам!/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /К покупкам!/i})).toHaveFocus();
  });
});
