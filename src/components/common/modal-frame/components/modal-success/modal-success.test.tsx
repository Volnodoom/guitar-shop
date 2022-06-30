import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../../../../utils/mock-faker';
import ModalReviewSuccess from './modal-review-success';


describe('Component: ModalReviewSuccess', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalReviewSuccess onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /К покупкам!/i})).toBeInTheDocument();
    expect(screen.getByLabelText(/Закрыть/i)).toBeInTheDocument();
  });

  it('Click on close button or button (К покупкам) call for callback function', async () => {
    const mockState = createMockState();
    const store = configureMockStore()(mockState);
    const fakeCallback = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalReviewSuccess onClose={fakeCallback}/>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /К покупкам!/i}));
    await waitFor(() => {expect(fakeCallback).toHaveBeenCalledTimes(1);});

    userEvent.click(screen.getByLabelText(/Закрыть/i));
    await waitFor(() => {expect(fakeCallback).toHaveBeenCalledTimes(2);});
  });
});
