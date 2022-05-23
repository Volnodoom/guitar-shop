import { address, datatype, image, internet, lorem } from 'faker';
import { NameSpace } from '../const';
import { initialState as initialStateGuitars } from '../store/data-guitars/data-guitars';
import { initialState as initialStateReviews } from '../store/data-reviews/data-reviews';
import { initialState as initialStateQuery } from '../store/query-params/query-params';
import { CoupledProductData, GuitarType, Review, UserReviewPost } from '../types/general.types';

export const createMockState = () => ({
  [NameSpace.DataGuitars]: {
    ...initialStateGuitars,
  },
  [NameSpace.DataReviews]: {
    ...initialStateReviews,
  },
  [NameSpace.QueryParams]: {
    ...initialStateQuery,
  },
});

export const mockGuitar = (): GuitarType => ({
  id: datatype.number(),
  name: address.cityName(),
  vendorCode: datatype.hexaDecimal(10),
  type: lorem.word(),
  description: lorem.text(),
  previewImg: image.imageUrl(),
  stringCount: datatype.number(),
  rating: datatype.number({max: 5}),
  price: datatype.number(),
});

export const makeMockOneGuitarWitId = (idNumber: number): GuitarType => ({
  ...mockGuitar(),
  id: idNumber,
});

export const makeMockGuitarArray = (lengthNumber: number, ids: number[]): GuitarType[] => Array.from({length: lengthNumber}, (line, index) => ({
  ...mockGuitar(),
  id: ids[index],
}));

export const mockReview = (): Review => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  comment: lorem.words(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toDateString(),
  guitarId: datatype.number(),
});

export const makeMockOneReviewWitId = (idString: string): Review => ({
  ...mockReview(),
  id: idString,
});

export const makeMockReviewsArray = (lengthNumber: number, ids: string[]) => Array.from({length: lengthNumber}, (line, index) => ({
  ...mockReview(),
  id: ids[index],
}));

export const makeMockReviewsForSpecificGuitar = (lengthNumber: number, id: number) => Array.from({length: lengthNumber}, (line, index) => ({
  ...mockReview(),
  guitarId: id,
}));

const mockCoupledData = (): CoupledProductData => ({
  ...mockGuitar(),
  comments: Array.from({length: datatype.number(15)}, () => mockReview())
});

export const makeMockProducts = (numberProducts: number): CoupledProductData[] =>
  Array.from({length: numberProducts}, () => mockCoupledData());

export const mockUserComment = (): UserReviewPost => ({
  userName: internet.userName(),
  advantage: internet.userName(),
  disadvantage: internet.userName(),
  comment: internet.userName(),
  rating: datatype.number(5),
  guitarId:  datatype.number(),
});
