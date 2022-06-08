import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Price from './price';


describe('Component: Price', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <Price />
      </MemoryRouter>
    );

    expect(screen.getByText(/Цена,/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/1 000/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/30 000/i)).toBeInTheDocument();
  });

});
