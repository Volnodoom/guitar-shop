import { APP_IMG_BASE, JPG_DOUBLE_DENSITY, JPG_ENDING_FORMAT, LoadingStatus, LOCAL_RU, ReviewDateTimeFormat, SERVER_IMG_BASE } from '../const';
import { CoupledProductData, GuitarType, Review, SeparatorType, UserReviewPost } from '../types/general.types';

export const formatBaseImgUrl = (url: string) => url.replace(SERVER_IMG_BASE, APP_IMG_BASE);
export const formatHighDensityImgUrl = (url: string) => url.replace(JPG_ENDING_FORMAT, JPG_DOUBLE_DENSITY);
export const formatReviewDate = (reviewDate: string) => new Date(reviewDate).toLocaleDateString(LOCAL_RU, ReviewDateTimeFormat);
export const compareFunctionEarlyToLate = (reviewA: Review, reviewB: Review) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt);

export const checkIsReviewFormValid = (data:UserReviewPost): boolean =>  Object.values(data).every((line) => line !== '');

export const checkStatusSuccess = (status: LoadingStatus) => status === LoadingStatus.Succeeded;
export const checkStatusLoading = (status: LoadingStatus) => status === LoadingStatus.Loading;
export const checkStatusFailed = (status: LoadingStatus) => status === LoadingStatus.Failed;

export const separateGuitarAndReviews = (data: CoupledProductData[]) => data
  .reduce((previousValue:SeparatorType, currentValue:CoupledProductData) => {
    const reviews = previousValue.reviews;
    const guitars = previousValue.guitars;

    const {comments, ...rest}: CoupledProductData = currentValue;

    reviews.push(...comments);
    guitars.push(rest);

    return {guitars, reviews};
  }, {guitars: [], reviews: []});

export const mockEntity = <T extends GuitarType[] | Review[]> (ids: string[], data: T) => ids
  .map((line, index) => ({[line]: data[index]}))
  .reduce((prev, current) => ({
    ...current,
    ...prev,
  }), {});
