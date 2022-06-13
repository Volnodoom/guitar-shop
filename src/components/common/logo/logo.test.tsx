import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRoutes, LogoPosition } from '../../../const';
import Logo from './logo';
import { createMockState } from '../../../utils/mock-faker';

describe('Component: Logo', () => {
  it('render correctly on header', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Logo position={LogoPosition.Header} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });

  it('render correctly on footer', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Logo position={LogoPosition.Footer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });

  it('click on logo initiate dispatch actions (clearQueryParams and clearGuitarsIdPerPage) and redirect to the root', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    const START_PATH = '/start';

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[START_PATH]}>
          <Routes>
            <Route path={AppRoutes.Root} element={<h1>Correct redirection</h1>} />
            <Route path={START_PATH} element={<Logo position={LogoPosition.Header}  />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByAltText(/Логотип/i));
    await waitFor(() => {expect(screen.getByText('Correct redirection')).toBeInTheDocument();});
  });
});
