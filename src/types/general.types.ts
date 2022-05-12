import { AxiosInstance } from 'axios';
import { KeyBoardNames } from '../const';
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

export type ModuleReviewStatus =  'openReview' | 'close' | 'success' | 'fail' | 'initial';

export type UserReviewPost = Omit<Review, 'id' | 'createAt'>;

export type DiveRef = HTMLDivElement | null;

export type KeyLogType = {[key in KeyBoardNames]: boolean };

export type DataCoupledType = 'comments' | null;

export type CoupledProductData = GuitarType & {comments: Review[]};

export type GuitarsIdsLineType = {[x: number]: number[]};
