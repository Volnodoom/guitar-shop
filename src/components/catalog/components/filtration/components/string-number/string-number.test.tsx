import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StringNumber from './string-number';


describe('Component: StringNumber', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <StringNumber />
      </MemoryRouter>
    );

    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByLabelText(4)).toBeInTheDocument();
    expect(screen.getByLabelText(6)).toBeInTheDocument();
    expect(screen.getByLabelText(7)).toBeInTheDocument();
    expect(screen.getByLabelText(12)).toBeInTheDocument();
  });

});
