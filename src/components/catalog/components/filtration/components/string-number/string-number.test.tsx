import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import StringNumber from './string-number';
import { createMockState } from '../../../../../../utils/mock-faker';
import { addFilterByString, removeFilterByString } from '../../../../../../store/query-params/query-params';
import { clearGuitarsIdPerPage } from '../../../../../../store/data-guitars/data-guitars';
import { NameSpace } from '../../../../../../const';
import { State } from '../../../../../../types/state.types';


describe('Component: StringNumber', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <StringNumber />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByLabelText(4)).toBeInTheDocument();
    expect(screen.getByLabelText(6)).toBeInTheDocument();
    expect(screen.getByLabelText(7)).toBeInTheDocument();
    expect(screen.getByLabelText(12)).toBeInTheDocument();
  });


  it('click on the unchecked label lead to mark this position checked', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <StringNumber />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByLabelText(4));
    await waitFor(() => {expect(screen.getByLabelText(4, {selector: 'input'})).toBeChecked();});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(addFilterByString(4));});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });

  it('labels must be checked, when store contain query params related to string number', () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByString: [4]
      }
    };
    const mockStore = configureMockStore()(updatedState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <StringNumber />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(4, {selector: 'input'})).toBeChecked();
  });

  it('when store contain query params related to string number, click on it to remove check', async () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByString: [4]
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <StringNumber />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByLabelText(4));
    await waitFor(() => {expect(screen.getByLabelText(4, {selector: 'input'})).not.toBeChecked();});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(removeFilterByString(4));});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });
});
