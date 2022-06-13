import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Filtration from './filtration';
import { createMockState } from '../../../../utils/mock-faker';

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

  });
});
