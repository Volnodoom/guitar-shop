import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Filtration from './filtration';

describe('Component: Filtration', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <Filtration />
      </MemoryRouter>
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Очистить/i})).toBeInTheDocument();
  });

});
