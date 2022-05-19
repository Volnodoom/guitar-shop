import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sorting from './sorting';


describe('Component: Sorting', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <Sorting />
      </MemoryRouter>
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по цене/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /по популярности/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /По возрастанию/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /По убыванию/i})).toBeInTheDocument();
  });

});
