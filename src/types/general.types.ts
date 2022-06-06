import { AxiosInstance } from 'axios';
import { KeyBoardNames, ReviewFormField, SortingOrder, SortingSort } from '../const';
import { AppDispatch, State } from './state.types';

export type GuitarType = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
};

export type Review = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
};

export type GeneralApiConfig = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
};

export type ProductType = {
    guitar: GuitarType,
    reviews: Review[],
};

export type GuitarDataStore = {
  [id in number]: {
    guitar: GuitarType,
    }
}

export type SeparatorType = {
  guitars: GuitarType[],
  reviews: Review[],
}

export type GuitarsPriceRange = {
  min: number,
  max: number,
}

export type ModuleReviewStatus =  'openReview' | 'close' | 'success' | 'fail' | 'initial';

export type UserReviewPost = Omit<Review, 'id' | 'createAt'>;

export type DiveRef = HTMLDivElement | null;

export type KeyLogType = {[key in KeyBoardNames]: boolean };

export type DataCoupledType = 'comments' | null;

export type CoupledProductData = GuitarType & {comments: Review[]};

export type GuitarsIdsLineType = {[x: number]: number[]};

export type EntityGuitarType = {[x: string]: GuitarType};

export type EntityReviewType = {[x: string]: Review};

export type ErrorType = unknown;

export type InvalidFormArray = (keyof typeof ReviewFormField)[]

export type ParamObject = {
  '_sort': null | SortingSort,
  '_order': null | SortingOrder,
  'price_gte': null | number,
  'price_lte': null | number,
  'name': null | string,
  'type': null | string,
}

export type KeysOfParamObject = ('_sort' | '_order'| 'price_gte'| 'price_lte'| 'name'| 'type') []

export type NoNullParamObject = {
  '_sort'?: SortingSort,
  '_order'?: SortingOrder,
  'price_gte'?: string,
  'price_lte'?: string,
  'name'?: string,
  'type'?: string,
}
