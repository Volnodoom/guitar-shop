import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../../../../const';
import { createMockState } from '../../../../../utils/mock-faker';
import HeaderNavigation from './header-navigation';


describe('Component: Header-Cart', () => {
  it('Render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <HeaderNavigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });

  it('Redirect to catalog when click on catalog link if it is a cart page', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[AppRoutes.CartAbsolute]}>
          <Routes>
            <Route path={AppRoutes.CartAbsolute} element={<HeaderNavigation />}/>
            <Route path={AppRoutes.Root} element={<h1>Correct redirection</h1>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Correct redirection/i)).not.toBeInTheDocument();
    const link = screen.getByText(/Каталог/i);
    await userEvent.click(link);
    expect(screen.getByText(/Correct redirection/i)).toBeInTheDocument();
  });
});
