import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import * as ReactRouter from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import Filtration from './filtration';
import { createMockState } from '../../../../utils/mock-faker';
import { clearQueryParams } from '../../../../store/query-params/query-params';
import { clearGuitarsIdPerPage } from '../../../../store/data-guitars/data-guitars';
import { GuitarPluralRu, KindOfGuitars, NameSpace } from '../../../../const';

describe('Component: Filtration', () => {
  it('Render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Filtration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Очистить/i})).toBeInTheDocument();
  });

  it('Click on one of Guitar types disable number of the strings that are not related to selected type', async () => {
    const mockState = createMockState();
    const updatedState = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByType: [KindOfGuitars.Acoustic]
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Filtration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(GuitarPluralRu.acoustic, {selector: 'input'})).toBeChecked();
    expect(screen.getByLabelText(4, {selector: 'input'})).toBeDisabled();
  });

  it('Click on Очистить button lead to clear user filtration', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Filtration />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /Очистить/i}));
    //called 3 times due to price component contain dispatch
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(3);});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearQueryParams());});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });

  it('Click on Очистить button call to clear search params with setSearchParams({})', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    const firstValue = new URLSearchParams();

    const setSearch = jest.fn();
    const useStateSpy = jest.spyOn(ReactRouter, 'useSearchParams');
    useStateSpy.mockImplementation(() => [firstValue, setSearch]);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Filtration />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', {name: /Очистить/i}));
    await waitFor(() => {expect(setSearch).toHaveBeenCalledWith({});});
  });
});
