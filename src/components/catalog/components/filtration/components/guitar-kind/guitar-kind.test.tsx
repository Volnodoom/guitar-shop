import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GuitarPluralRu } from '../../../../../../const';
import GuitarKind from './guitar-kind';


describe('Component: GuitarKind', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <GuitarKind />
      </MemoryRouter>
    );

    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.acoustic)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.electric)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.ukulele)).toBeInTheDocument();
  });

});
