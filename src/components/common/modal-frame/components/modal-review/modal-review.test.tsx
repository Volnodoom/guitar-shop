import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoadingStatus, NameSpace, RATING_OPTIONS } from '../../../../../const';
import { createMockState, mockGuitar } from '../../../../../utils/mock-faker';
import ModalReview from './modal-review';

const mockState = createMockState();
const store = configureMockStore()(mockState);
const fakeGuitar = mockGuitar();

describe('Component: ModalREview', () => {
  it('Render correctly', () => {
    const FIELDS_NUMBER = 4;

    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalReview guitarDetails={fakeGuitar} onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();

    expect(screen.getByLabelText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByTestId(/input-name/i)).toBeInTheDocument();

    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByTitle(RATING_OPTIONS[0].value)).toBeInTheDocument();
    expect(screen.getByTitle(RATING_OPTIONS[1].value)).toBeInTheDocument();
    expect(screen.getByTitle(RATING_OPTIONS[2].value)).toBeInTheDocument();
    expect(screen.getByTitle(RATING_OPTIONS[3].value)).toBeInTheDocument();
    expect(screen.getByTitle(RATING_OPTIONS[4].value)).toBeInTheDocument();

    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByTestId(/input-adv/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByTestId(/input-disadv/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByTestId(/input-textarea/i)).toBeInTheDocument();

    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();

    expect(screen.getByRole('button', {name: /Отправить отзыв/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toBeInTheDocument();

    expect(screen.queryAllByText(/Заполните поле/i)).toHaveLength(FIELDS_NUMBER);
    expect(screen.getByText(/Поставьте оценку/i)).toBeInTheDocument();
  });

  it('Invalid submission is prevented', async () => {
    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalReview guitarDetails={fakeGuitar} onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.type(screen.getByTestId(/input-name/i), 'name');
    userEvent.type(screen.getByTestId(/input-adv/i), 'adv');
    userEvent.type(screen.getByTestId(/input-disadv/i), 'disadv');
    userEvent.type(screen.getByTestId(/input-textarea/i), 'textarea');

    userEvent.click(screen.getByRole('button', {name: /Отправить отзыв/i}));
    await waitFor(() => {expect(screen.getByText(/Поставьте оценку/i)).not.toBeVisible();});
    await waitFor(() => {
      const fillTheField = screen.queryAllByText(/Заполните поле/i);
      fillTheField.every((line) => expect(line).not.toBeVisible());
    });
    await waitFor(() => {expect(fakeOnSuccess).not.toHaveBeenCalled();});
  });

  it('Call onSuccess callback when form valid and submitted', async () => {
    const updatedState = {
      ...mockState,
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        commentStatus: LoadingStatus.Succeeded
      }
    };

    const storeSpec = configureMockStore()(updatedState);

    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();

    storeSpec.dispatch = jest.fn();

    render(
      <Provider store={storeSpec}>
        <MemoryRouter>
          <ModalReview guitarDetails={fakeGuitar} onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>
        </MemoryRouter>
      </Provider>
    );

    expect(storeSpec.dispatch).toHaveBeenCalledTimes(1);
    expect(fakeOnSuccess).toHaveBeenCalledTimes(1);
  });

  it('On close button click form successfully close', async () => {
    const storeSpec = configureMockStore()(mockState);

    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();
    store.dispatch = jest.fn();

    render(
      <Provider store={storeSpec}>
        <MemoryRouter>
          <ModalReview guitarDetails={fakeGuitar} onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /Закрыть/i}));
    await waitFor(() => {expect(fakeOnClose).toHaveBeenCalledTimes(1);});
  });

  it('Focus trap work on any components inside Module Frame', () => {
    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalReview guitarDetails={fakeGuitar} onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.tab();
    expect(screen.getByTestId(/input-name/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/rate-star-5/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/rate-star-4/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/rate-star-3/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/rate-star-2/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/rate-star-1/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/input-adv/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/input-disadv/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/input-textarea/i)).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Отправить отзыв/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId(/input-name/i)).toHaveFocus();
  });
});
