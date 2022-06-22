import { datatype, lorem } from 'faker';
import { LoadingStatus } from '../../const';
import { makeMockOneReviewWitId, makeMockReviewsArray } from '../../utils/mock-faker';
import { addOneReview, dataReviews, initialState as initialStateReviews, setCommentStatus, setReviews, setReviewsStatus } from './data-reviews';

const fakeWord = lorem.word();
const ARRAY_LENGTH = 10;
const mockIds = Array.from({length: ARRAY_LENGTH}, () => String(datatype.number()));

describe('Store: DATA_REVIEWS', () => {
  describe('Check sliceReducer actions', () => {
    it('unknown action -- return initial state', () => {
      expect(dataReviews.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialStateReviews);
    });

    it('setReviews -- update normalized data of reviews (lines ids and entities)', () => {
      const mockReviews = makeMockReviewsArray(ARRAY_LENGTH, mockIds);
      const mockEntity = mockIds
        .map((line, index) => ({[line]: mockReviews[index]}))
        .reduce((prev, current) => ({
          ...current,
          ...prev,
        }), {});

      expect(dataReviews.reducer(initialStateReviews, setReviews(mockReviews)))
        .toEqual({
          ...initialStateReviews,
          ids: mockIds,
          entities: mockEntity,
        });
    });

    it('addOneReview -- add ONE review to normalized data of reviews (lines ids and entities)', () => {
      const oneReview = makeMockOneReviewWitId(fakeWord);
      expect(dataReviews.reducer(initialStateReviews, addOneReview(oneReview)))
        .toEqual({
          ...initialStateReviews,
          ids: [fakeWord],
          entities: {[fakeWord]: oneReview}
        });
    });

    it('setCommentStatus -- set LoadingStatus to the line commentStatus of the store', () => {
      expect(dataReviews.reducer(initialStateReviews, setCommentStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateReviews,
          commentStatus: LoadingStatus.Succeeded,
        });
    });

    it('setReviewsStatus -- set LoadingStatus to the line reviewsStatus of the store', () => {
      expect(dataReviews.reducer(initialStateReviews, setReviewsStatus(LoadingStatus.Succeeded)))
        .toEqual({
          ...initialStateReviews,
          reviewsStatus: LoadingStatus.Succeeded,
        });
    });
  });
});
