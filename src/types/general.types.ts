import { KeyBoardNames } from '../const';

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

export type ModuleReviewStatus =  'openReview' | 'close' | 'success' | 'fail' | 'initial';

export type UserReviewPost = Omit<Review, 'id' | 'createAt'>;

export type DiveRef = HTMLDivElement | null;

export type KeyLogType = {[key in KeyBoardNames]: boolean };
