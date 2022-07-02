import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ModalKind } from '../../../const';
import { addCartContent, removeCartContent, removeCartContentNumber } from '../../../store/data-cart/data-cart';
import { createMockState,  mockGuitar } from '../../../utils/mock-faker';
import ModalFrame from './modal-frame';

const mockState = createMockState();
const store = configureMockStore()(mockState);
const fakeGuitar = mockGuitar();

describe('Component: ModalFrame', () => {
  it('render correctly ModalReview', () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalFrame
            onClose={fakeOnClose}
            isOpen={FRAME_ACTIVE}
            modalKind={MODAL_REVIEW}
            guitarDetails={fakeGuitar}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('Demonstrate nothing if module frame is not active', () => {
    const FRAME_ACTIVE = false;
    const MODAL_REVIEW = ModalKind.Null;

    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalFrame
            onClose={fakeOnClose}
            isOpen={FRAME_ACTIVE}
            modalKind={MODAL_REVIEW}
            guitarDetails={fakeGuitar}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();
  });

  it('Pressing Escape close any active modal window', async () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalFrame
            onClose={fakeOnClose}
            isOpen={FRAME_ACTIVE}
            modalKind={MODAL_REVIEW}
            guitarDetails={fakeGuitar}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(fakeOnClose).toBeCalledTimes(1);
  });

  it('Overlay click close the frame', async () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalFrame
            onClose={fakeOnClose}
            isOpen={FRAME_ACTIVE}
            modalKind={MODAL_REVIEW}
            guitarDetails={fakeGuitar}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId(/overlay/i));
    expect(fakeOnClose).toBeCalledTimes(1);
  });

  it('Modal-Add on click Add-To-Cart dispatch actions', async () => {
    const FRAME_ACTIVE = true;
    const MODAL_ADD = ModalKind.CartAdd;

    const storeSpec = configureMockStore()(mockState);

    const fakeOnClose = jest.fn();
    storeSpec.dispatch = jest.fn();

    render(
      <Provider store={storeSpec}>
        <MemoryRouter>
          <ModalFrame
            onClose={fakeOnClose}
            isOpen={FRAME_ACTIVE}
            modalKind={MODAL_ADD}
            guitarDetails={fakeGuitar}
          />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Добавить в корзину/i));
    expect(storeSpec.dispatch).toHaveBeenCalledWith(addCartContent(fakeGuitar));
  });

  it('Modal-Delete on click Delete-From-Cart dispatch actions', async () => {
    const FRAME_ACTIVE = true;
    const MODAL_DELETE = ModalKind.CartDelete;

    const storeSpec = configureMockStore()(mockState);

    const fakeOnClose = jest.fn();
    storeSpec.dispatch = jest.fn();

    render(
      <Provider store={storeSpec}>
        <MemoryRouter>
          <ModalFrame
            onClose={fakeOnClose}
            isOpen={FRAME_ACTIVE}
            modalKind={MODAL_DELETE}
            guitarDetails={fakeGuitar}
          />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Удалить товар/i));
    expect(storeSpec.dispatch).toHaveBeenCalledWith(removeCartContent({guitarId: fakeGuitar.id}));
    expect(storeSpec.dispatch).toHaveBeenCalledWith(removeCartContentNumber({guitarId: fakeGuitar.id}));
  });
});
