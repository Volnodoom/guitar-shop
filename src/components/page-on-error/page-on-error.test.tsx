import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageOnError from './page-on-error';

describe('Component: PageOnError', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <PageOnError />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to catalog page/i)).toBeInTheDocument();
  });

});
