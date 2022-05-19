import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GuitarKind from './guitar-kind';

describe('Component: GuitarKind', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <GuitarKind />
      </MemoryRouter>
    );

    expect(screen.getByText(/Цена,/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/1 000/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/30 000/i)).toBeInTheDocument();
  });

});
