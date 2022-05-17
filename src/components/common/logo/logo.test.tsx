import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LogoPosition } from '../../../const';
import Logo from './logo';

describe('Component: Logo', () => {
  it('render correctly on header', () => {
    render(
      <MemoryRouter>
        <Logo position={LogoPosition.Header} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });

  it('render correctly on footer', () => {
    render(
      <MemoryRouter>
        <Logo position={LogoPosition.Footer} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });
});
