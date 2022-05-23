import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoadingStatus, NameSpace, RATING_OPTIONS } from '../../../../const';
import { GuitarType } from '../../../../types/general.types';
import { createMockState, makeMockOneGuitarWitId } from '../../../../utils/mock-faker';
import ModalReview from './modal-review';


describe('Component: ModalREview', () => {
  it('Render correctly', () => {
    const SPECIFIC_GUITAR_ID = 5;
    const FIELDS_NUMBER = 4;

    const mockState = createMockState();
    const fakeGuitarData: GuitarType = makeMockOneGuitarWitId(SPECIFIC_GUITAR_ID);
    const fakeGuitarEntities = {[SPECIFIC_GUITAR_ID]: fakeGuitarData};

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
      }
    };

    const store = configureMockStore()(updatedState);
    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ModalReview onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitarData.name)).toBeInTheDocument();

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

    expect(screen.getByText(fakeGuitarData.name)).toBeInTheDocument();

    expect(screen.getByRole('button', {name: /Отправить отзыв/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Закрыть/i})).toBeInTheDocument();

    expect(screen.queryAllByText(/Заполните поле/i)).toHaveLength(FIELDS_NUMBER);
    expect(screen.getByText(/Поставьте оценку/i)).toBeInTheDocument();
  });

  it('Invalid submission is prevented', async () => {
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();
    const fakeGuitarData: GuitarType = makeMockOneGuitarWitId(SPECIFIC_GUITAR_ID);
    const fakeGuitarEntities = {[SPECIFIC_GUITAR_ID]: fakeGuitarData};

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
      }
    };

    const store = configureMockStore()(updatedState);
    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ModalReview onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.type(screen.getByTestId(/input-name/i), 'name');
    userEvent.type(screen.getByTestId(/input-adv/i), 'adv');
    userEvent.type(screen.getByTestId(/input-disadv/i), 'disadv');
    userEvent.type(screen.getByTestId(/input-textarea/i), 'textarea');

    await waitFor(() => {expect(screen.getByText(/Поставьте оценку/i)).toBeInTheDocument();});
    await waitFor(() => {expect(screen.queryAllByText(/Заполните поле/i)).toHaveLength(0);});
    userEvent.click(screen.getByRole('button', {name: /Отправить отзыв/i}));
    await waitFor(() => {expect(fakeOnSuccess).not.toHaveBeenCalled();});
  });

  it('Call onSuccess callback when form valid and submitted', async () => {
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();
    const fakeGuitarData: GuitarType = makeMockOneGuitarWitId(SPECIFIC_GUITAR_ID);
    const fakeGuitarEntities = {[SPECIFIC_GUITAR_ID]: fakeGuitarData};

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
      },
      [NameSpace.DataReviews]: {
        ...mockState[NameSpace.DataReviews],
        commentStatus: LoadingStatus.Succeeded
      }
    };

    const store = configureMockStore()(updatedState);
    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ModalReview onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fakeOnSuccess).toHaveBeenCalledTimes(1);
  });

  it('On close button click form successfully close', async () => {
    const SPECIFIC_GUITAR_ID = 5;

    const mockState = createMockState();
    const fakeGuitarData: GuitarType = makeMockOneGuitarWitId(SPECIFIC_GUITAR_ID);
    const fakeGuitarEntities = {[SPECIFIC_GUITAR_ID]: fakeGuitarData};

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: fakeGuitarEntities,
        ids: [SPECIFIC_GUITAR_ID],
      },
    };

    const store = configureMockStore()(updatedState);
    const fakeOnSuccess = jest.fn();
    const fakeOnClose = jest.fn();
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<ModalReview onSuccess={fakeOnSuccess} onClose={fakeOnClose}/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /Закрыть/i}));
    await waitFor(() => {expect(fakeOnClose).toHaveBeenCalledTimes(1);});
  });
});
