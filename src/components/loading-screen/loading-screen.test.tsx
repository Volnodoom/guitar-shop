import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <LoadingScreen />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
