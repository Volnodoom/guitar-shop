import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotAvailablePage from './not-available-page';

describe('Component: NotAvailablePage', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <NotAvailablePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to catalog page/i)).toBeInTheDocument();
  });

});
