import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GuitarPluralRu } from '../../../../../../const';
import Price from './price';

describe('Component: Price', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <Price />
      </MemoryRouter>
    );

    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.acoustic)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.electric)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.ukulele)).toBeInTheDocument();
  });

});
