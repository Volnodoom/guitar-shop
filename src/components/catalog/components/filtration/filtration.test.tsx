import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Filtration from './filtration';
import { createMockState } from '../../../../utils/mock-faker';
import { clearQueryParams } from '../../../../store/query-params/query-params';
import { clearGuitarsIdPerPage } from '../../../../store/data-guitars/data-guitars';
import { GuitarPluralRu } from '../../../../const';

describe('Component: Filtration', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

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

  it('click on one of Guitar types disable number of the strings that are not related to selected type', async () => {
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

    userEvent.click(screen.getByLabelText(GuitarPluralRu.acoustic));
    await waitFor(() => {expect(screen.getByLabelText(4, {selector: 'input'})).toBeDisabled();});
  });

  it('click on Очистить button lead to clear filtration and search params (call for actions clearQueryParams)', async () => {
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
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearQueryParams());});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });
});
