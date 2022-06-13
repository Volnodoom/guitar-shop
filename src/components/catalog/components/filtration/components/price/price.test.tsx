import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Price from './price';
import { createMockState } from '../../../../../../utils/mock-faker';
import { NameSpace } from '../../../../../../const';
import { State } from '../../../../../../types/state.types';


describe('Component: Price', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 100,
          max: 200,
        },
      }
    };
    const mockStore = configureMockStore()(updatedState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Price />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена,/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/100/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/200/i)).toBeInTheDocument();
  });

  it('handle price input: change price in the range (priceExtremes) and press Enter', async () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 100,
          max: 200,
        },
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Price />
        </MemoryRouter>
      </Provider>
    );


    userEvent.type(screen.getByPlaceholderText(/100/i), '150');
    // screen.getByPlaceholderText(/200/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
    // await waitFor(() => {expect(screen.getByText(/150/i)).toBeInTheDocument();});
    // expect(screen.getByPlaceholderText(/200/i)).toBeInTheDocument();
  });
});
