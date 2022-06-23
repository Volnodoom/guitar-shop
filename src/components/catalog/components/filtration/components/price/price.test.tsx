import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Price from './price';
import { createMockState } from '../../../../../../utils/mock-faker';
import { LoadingStatus, NameSpace } from '../../../../../../const';
import { State } from '../../../../../../types/state.types';
import { setPriceRangeStart } from '../../../../../../store/query-params/query-params';
import { clearGuitarsIdPerPage } from '../../../../../../store/data-guitars/data-guitars';

jest.mock('../../../../../../store/query-params/query-params', () => ({
  setPriceRangeEnd: jest.fn(),
  setPriceRangeStart: jest.fn(),
}));

const FAKE_FALSE = false;
const fakeResetFunction = jest.fn();

describe('Component: Price', () => {
  it('Render correctly', () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 100,
          max: 200,
        },
        priceStatus: LoadingStatus.Succeeded,
      }
    };
    const mockStore = configureMockStore()(updatedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter >
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Цена,/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/100/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/200/i)).toBeInTheDocument();
  });

  it('Handle min price input: change price in the range (priceExtremes) and press Enter', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );


    await userEvent.type(screen.getByPlaceholderText(/100/i), '150');
    screen.getByPlaceholderText(/100/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });

  it('Handle min price input: reset price to min price, when input out of the range of min (priceExtremes) and press Enter', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );


    await userEvent.type(screen.getByPlaceholderText(/100/i), '50');
    screen.getByPlaceholderText(/100/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setPriceRangeStart(100));});
  });

  it('Handle min price input: reset price to max price, when input out of the range of max (priceExtremes) and press Enter', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );


    await userEvent.type(screen.getByPlaceholderText(/100/i), '350');
    screen.getByPlaceholderText(/100/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setPriceRangeStart(200));});
  });

  it('Handle max price input: change price in the range (priceExtremes) and press Enter', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );


    await userEvent.type(screen.getByPlaceholderText(/200/i), '150');
    screen.getByPlaceholderText(/200/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });

  it('Handle max price input: reset price to max price, when input out of the range of max (priceExtremes) and press Enter', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );


    await userEvent.type(screen.getByPlaceholderText(/200/i), '350');
    screen.getByPlaceholderText(/200/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setPriceRangeStart(200));});
  });

  it('Handle max price input: reset price to min price, when input out of the range of min (priceExtremes) and press Enter', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );


    await userEvent.type(screen.getByPlaceholderText(/200/i), '20');
    screen.getByPlaceholderText(/200/i).focus();
    userEvent.keyboard('{Enter}');
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(setPriceRangeStart(200));});
  });

  it('Display min and max values, when store contain min and max prices (in case the user paste url with query params)', async () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 100,
          max: 200,
        },
      },
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        priceRangeStart: 120,
        priceRangeEnd: 170,
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_FALSE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );

    expect( screen.getByDisplayValue(/120/i)).toBeInTheDocument();
    expect( screen.getByDisplayValue(/170/i)).toBeInTheDocument();
  });

  it('When isReset true reset function call in the component, and clear all component states', async () => {
    const FAKE_TRUE = true;
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        priceExtremes: {
          min: 100,
          max: 200,
        },
        priceStatus: LoadingStatus.Succeeded,
      },
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        priceRangeStart: 120,
        priceRangeEnd: 170,
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <Price isReset={FAKE_TRUE} resetFunction={fakeResetFunction}/>
        </MemoryRouter>
      </Provider>
    );

    expect( screen.queryByDisplayValue(/120/i)).not.toBeInTheDocument();
    expect( screen.queryByDisplayValue(/170/i)).not.toBeInTheDocument();
    expect(fakeResetFunction).toHaveBeenCalledWith(false);
    expect(fakeResetFunction).toHaveBeenCalledTimes(1);
  });
});
