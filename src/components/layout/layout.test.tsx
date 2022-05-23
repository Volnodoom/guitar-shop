import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMockState } from '../../utils/mock-faker';
import Layout from './layout';


describe('Component: Layout', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/one/def']}>
          <Routes>
            <Route path={'/one'} element={<Layout />}>
              <Route path={'def'} element={<h1>def element</h1>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/def element/i)).toBeInTheDocument();
  });

});
