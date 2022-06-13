import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PageOnError from './page-on-error';
import { createMockState } from '../../utils/mock-faker';
import { AppRoutes, ONE } from '../../const';
import { clearQueryParams } from '../../store/query-params/query-params';
import { clearGuitarsIdPerPage } from '../../store/data-guitars/data-guitars';

describe('Component: PageOnError', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PageOnError />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to catalog page/i)).toBeInTheDocument();
  });

  it('click on link (Go to catalog page) initiate dispatch actions (clearQueryParams and clearGuitarsIdPerPage) and redirect to catalog page', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    const START_PATH = '/start';

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[START_PATH]}>
          <Routes>
            <Route path={AppRoutes.CatalogPageAbsolute(ONE)} element={<h1>Correct redirection</h1>} />
            <Route path={START_PATH} element={<PageOnError />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByText(/Go to catalog page/i));
    await waitFor(() => {expect(screen.getByText('Correct redirection')).toBeInTheDocument();});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearQueryParams());});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(clearGuitarsIdPerPage());});
  });
});
