import { APP_IMG_BASE, JPG_DOUBLE_DENSITY, JPG_ENDING_FORMAT, LOCAL_RU, ReviewDateTimeFormat, SERVER_IMG_BASE } from '../const';
import dayjs from 'dayjs';
import { CoupledProductData, GuitarType, Review, UserReviewPost } from '../types/general.types';

export const formatBaseImgUrl = (url: string) => url.replace(SERVER_IMG_BASE, APP_IMG_BASE);
export const formatHighDensityImgUrl = (url: string) => url.replace(JPG_ENDING_FORMAT, JPG_DOUBLE_DENSITY);
export const formatReviewDate = (reviewDate: string) => new Date(reviewDate).toLocaleDateString(LOCAL_RU, ReviewDateTimeFormat);
export const compareFunctionEarlyToLate = (reviewA: Review, reviewB: Review) => dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

export const checkIsReviewFormValid = (data:UserReviewPost): boolean =>  Object.values(data).every((line) => line !== '');

type SeparatorType = {
  guitars: GuitarType[],
  reviews: Review[],
}

export const separateGuitarAndReviews = (data: CoupledProductData[]) => data
  .reduce((previousValue:SeparatorType , currentValue:CoupledProductData) => {
    const reviews = previousValue.reviews;
    const guitars = previousValue.guitars;
    reviews.push(...(currentValue.comments as Review[]));
    delete currentValue.comments;
    guitars.push({...currentValue});
    return {guitars, reviews};
  }, {guitars: [], reviews: []});
