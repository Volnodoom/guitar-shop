import { JPG_DOUBLE_DENSITY, JPG_ENDING_FORMAT, LOCAL_RU, ReviewDateTimeFormat } from '../const';
import dayjs from 'dayjs';
import { Review } from '../types/general.types';

export const formatImgUrl = (url: string) => `/${url.replace(JPG_ENDING_FORMAT, JPG_DOUBLE_DENSITY)}`;
export const formatReviewDate = (reviewDate: string) => new Date(reviewDate).toLocaleDateString(LOCAL_RU, ReviewDateTimeFormat);
export const compareFunctionEarlyToLate = (reviewA: Review, reviewB: Review) => dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));
