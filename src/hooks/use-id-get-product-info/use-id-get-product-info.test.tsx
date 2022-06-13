import { renderHook } from '@testing-library/react-hooks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState, makeMockOneGuitarWitId, makeMockReviewsForSpecificGuitar } from '../../utils/mock-faker';
import React, {FC} from 'react';
import { useIdGetProductInfo } from './use-id-get-product-info';
import { AppRoutes, NameSpace } from '../../const';
import { datatype } from 'faker';
import { EntityReviewType, GuitarType, Review } from '../../types/general.types';
import { mockEntity } from '../../utils/utils-components';

const SPECIFIC_GUITAR_ID = 55;
const ITEMS_NUMBER = 10;

const fakeIds = Array.from({length: ITEMS_NUMBER}, () => datatype.number());
const fakeReviewsData: Review[] = makeMockReviewsForSpecificGuitar(ITEMS_NUMBER, SPECIFIC_GUITAR_ID);
const fakeReviewsEntities = mockEntity(fakeIds, fakeReviewsData) as EntityReviewType;

const fakeGuitarData: GuitarType = makeMockOneGuitarWitId(SPECIFIC_GUITAR_ID);
const fakeGuitarEntities = {
  [SPECIFIC_GUITAR_ID]: fakeGuitarData,
  12: makeMockOneGuitarWitId(12),
  14: makeMockOneGuitarWitId(14),
};

const mockState = createMockState();

const updatedState = {
  ...mockState,
  [NameSpace.DataReviews]: {
    ...mockState[NameSpace.DataReviews],
    entities: fakeReviewsEntities,
    ids: fakeIds,
  },
  [NameSpace.DataGuitars]: {
    ...mockState[NameSpace.DataGuitars],
    entities: fakeGuitarEntities,
    ids: [SPECIFIC_GUITAR_ID, 12, 14],
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({id: String(SPECIFIC_GUITAR_ID)})
}));

describe('Custom hook: use-set-catalog-page-state', () => {
  it('Return three elements (object, array, string)', () => {
    const mockStore = configureMockStore()(updatedState);

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) =>
      (
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={[`/catalog/${AppRoutes.Guitar(SPECIFIC_GUITAR_ID)}`]}>
            {children}
          </MemoryRouter>
        </Provider>
      );
    const {result} = renderHook(() => useIdGetProductInfo(), {wrapper});
    const [guitar, reviews, id] = result.current;

    expect(result.current).toHaveLength(3);
    expect(guitar).toBeInstanceOf(Object);
    expect(reviews).toBeInstanceOf(Array);
    expect(id).toBe(String(SPECIFIC_GUITAR_ID));
  });
});
