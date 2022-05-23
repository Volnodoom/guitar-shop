import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMockState, mockReview } from '../../../../utils/mock-faker';
import { formatReviewDate } from '../../../../utils/utils-components';
import CardReview from './card-review';


describe('Component: CardReview', () => {
  it('render correctly', () => {
    const SPECIFIC_GUITAR_ID = 5;

    const fakeReview = mockReview();
    const formattedDate = formatReviewDate(fakeReview.createAt);

    const mockState = createMockState();
    const store = configureMockStore()(mockState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${SPECIFIC_GUITAR_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<CardReview reviewInfo={fakeReview}/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
  });
});
