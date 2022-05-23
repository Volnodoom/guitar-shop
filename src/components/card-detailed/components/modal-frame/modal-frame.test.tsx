import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ModalKind, NameSpace } from '../../../../const';
import { GuitarType } from '../../../../types/general.types';
import { createMockState, makeMockOneGuitarWitId } from '../../../../utils/mock-faker';
import ModalFrame from './modal-frame';

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

describe('Component: ModalFrame', () => {
  it('render correctly ModalReview', () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const store = configureMockStore()(updatedState);
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={
              <ModalFrame
                onClose={fakeOnClose}
                currentFrameStatus={FRAME_ACTIVE}
                modalInfo={MODAL_REVIEW}
              />
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('Demonstrate nothing if module frame is not active', () => {
    const FRAME_ACTIVE = false;
    const MODAL_REVIEW = ModalKind.Null;


    const store = configureMockStore()(updatedState);
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={
              <ModalFrame
                onClose={fakeOnClose}
                currentFrameStatus={FRAME_ACTIVE}
                modalInfo={MODAL_REVIEW}
              />
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();
  });

  it('Pressing Escape close any active modal window', async () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const store = configureMockStore()(updatedState);
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={
              <ModalFrame
                onClose={fakeOnClose}
                currentFrameStatus={FRAME_ACTIVE}
                modalInfo={MODAL_REVIEW}
              />
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    userEvent.keyboard('{Escape}');
    await waitFor(() => {expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();});
    await waitFor(() => {expect(fakeOnClose).toBeCalledTimes(1);});
  });

  it('Overlay click close the frame', async () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const store = configureMockStore()(updatedState);
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={
              <ModalFrame
                onClose={fakeOnClose}
                currentFrameStatus={FRAME_ACTIVE}
                modalInfo={MODAL_REVIEW}
              />
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/overlay/i));
    await waitFor(() => {expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();});
    await waitFor(() => {expect(fakeOnClose).toBeCalledTimes(1);});
  });

  it('Focus trap work on any components inside Module Frame', () => {
    const FRAME_ACTIVE = true;
    const MODAL_REVIEW = ModalKind.Review;

    const store = configureMockStore()(updatedState);
    const fakeOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={
              <ModalFrame
                onClose={fakeOnClose}
                currentFrameStatus={FRAME_ACTIVE}
                modalInfo={MODAL_REVIEW}
              />
            }
            />
          </Routes>
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
  });
});
