import { address, datatype, image, internet, lorem } from 'faker';
import { KindOfGuitars, NameSpace } from '../const';
import { initialState as initialStateCart } from '../store/data-cart/data-cart';
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
  [NameSpace.DataCart]: {
    ...initialStateCart,
  },
});

const fakeName = () => address.cityName();
const fakeType = () => lorem.word();
const fakeStringCount = () => datatype.number();
const fakeRating = () => datatype.number({max: 5});
const fakePrice = () => datatype.number();

export const mockGuitar = (): GuitarType => ({
  id: datatype.number(),
  name: address.cityName(),
  vendorCode: datatype.hexaDecimal(10),
  type: Object.values(KindOfGuitars)[datatype.number({max: 2})],
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

export type MockGuitarSpecific = {
  nameSpecific: string,
  typeSpecific: KindOfGuitars[] | string,
  stringCountSpecific: number | number[] | null,
  ratingSpecific: number | {min: number, max: number} | null,
  priceSpecific: number | {min: number, max: number} | null,
}

export const initialSpecific = {
  nameSpecific: '',
  typeSpecific: '',
  stringCountSpecific: null,
  ratingSpecific: null,
  priceSpecific: null,
};

export const makeMockGuitarArrayWithSpecificFields = (
  lengthNumber: number,
  ids: number[],
  specific: MockGuitarSpecific = initialSpecific,
) => Array.from({length: lengthNumber}, (line, index) => {
  let nameResult = fakeName();
  let typeResult = fakeType();
  let stringCountResult = fakeStringCount();
  let ratingResult = fakeRating();
  let priceResult = fakePrice();

  const {nameSpecific, typeSpecific, stringCountSpecific, ratingSpecific, priceSpecific} = specific;

  if(nameSpecific && index === lengthNumber - 1) {
    nameResult = nameSpecific;
  }
  if(typeSpecific.length !== 0) {
    typeResult = (typeSpecific as KindOfGuitars[])[datatype.number({max: typeSpecific.length - 1})];
  }
  if(stringCountSpecific) {
    if(Number(stringCountSpecific) && index === lengthNumber - 1) {
      stringCountResult = stringCountSpecific as number;
    }
    if(!Number(stringCountSpecific) && (stringCountSpecific as number[]).length === 2) {
      index === lengthNumber - 2 && (stringCountResult = (stringCountSpecific as number[])[0]);
      index === lengthNumber - 1 && (stringCountResult = (stringCountSpecific as number[])[1]);
    }
    if(!Number(stringCountSpecific) && (stringCountSpecific as number[]).length === 3) {
      index === lengthNumber - 3 && (stringCountResult = (stringCountSpecific as number[])[0]);
      index === lengthNumber - 2 && (stringCountResult = (stringCountSpecific as number[])[1]);
      index === lengthNumber - 1 && (stringCountResult = (stringCountSpecific as number[])[2]);
    }
    if(!Number(stringCountSpecific) && (stringCountSpecific as number[]).length === 4) {
      index === lengthNumber - 4 && (stringCountResult = (stringCountSpecific as number[])[3]);
      index === lengthNumber - 3 && (stringCountResult = (stringCountSpecific as number[])[2]);
      index === lengthNumber - 2 && (stringCountResult = (stringCountSpecific as number[])[1]);
      index === lengthNumber - 1 && (stringCountResult = (stringCountSpecific as number[])[0]);
    }
  }
  if(ratingSpecific) {
    if(Number(ratingSpecific) && index === lengthNumber - 1) {
      ratingResult = ratingSpecific as number;
    }
    if(!Number(ratingSpecific) && lengthNumber >= 2 && index === lengthNumber - 2) {
      ratingResult = (ratingSpecific as {min: number, max: number}).min;
    }
    if(!Number(ratingSpecific) && lengthNumber >= 2 && index === lengthNumber - 1) {
      ratingResult = (ratingSpecific as {min: number, max: number}).max;
    }
  }
  if(priceSpecific) {
    if(Number(priceSpecific) && index === lengthNumber - 1) {
      priceResult = priceSpecific as number;
    }
    if(!Number(priceSpecific) && lengthNumber >= 2 && index === lengthNumber - 2) {
      priceResult = (priceSpecific as {min: number, max: number}).min;
    }
    if(!Number(priceSpecific) && lengthNumber >= 2 && index === lengthNumber - 1) {
      priceResult = (priceSpecific as {min: number, max: number}).max;
    }
  }

  return {
    ...mockGuitar(),
    id: ids[index],
    name: nameResult,
    type: typeResult,
    stringCount: stringCountResult,
    rating: ratingResult,
    price: priceResult,
  };
});

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
