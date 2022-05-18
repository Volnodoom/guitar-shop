import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StarSize } from '../../../const';
import RatingStars from './rating-stars';

const ONE = 1;
const TWO = 1;
const THREE = 1;
const FOUR = 1;
const FIVE = 1;

describe('Component: rating-stars', () => {
  it('rendering rating with one highlighted star', () => {
    render(
      <MemoryRouter>
        <RatingStars type={StarSize.CardPreview.name} ratingValue={ONE} />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId(/icon-full-star/i)).toHaveLength(ONE);
  });

  it('rendering rating with two highlighted stars', () => {
    render(
      <MemoryRouter>
        <RatingStars type={StarSize.CardPreview.name} ratingValue={TWO} />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId(/icon-full-star/i)).toHaveLength(TWO);
  });

  it('rendering rating with three highlighted stars', () => {
    render(
      <MemoryRouter>
        <RatingStars type={StarSize.CardPreview.name} ratingValue={THREE} />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId(/icon-full-star/i)).toHaveLength(THREE);
  });

  it('rendering rating with four highlighted stasr', () => {
    render(
      <MemoryRouter>
        <RatingStars type={StarSize.CardPreview.name} ratingValue={FOUR} />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId(/icon-full-star/i)).toHaveLength(FOUR);
  });

  it('rendering rating with five highlighted stars', () => {
    render(
      <MemoryRouter>
        <RatingStars type={StarSize.CardPreview.name} ratingValue={FIVE} />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId(/icon-full-star/i)).toHaveLength(FIVE);
  });
});
