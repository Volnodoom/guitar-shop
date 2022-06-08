import { APP_IMG_BASE, JPG_DOUBLE_DENSITY, JPG_ENDING_FORMAT, KeyBoardCode, LoadingStatus, LOCAL_RU, ONE, ReviewDateTimeFormat, SERVER_IMG_BASE } from '../const';
import { CoupledProductData, GuitarType, KeysOfParamObject, NoNullParamObject, ParamObject, Review, SeparatorType, UserReviewPost } from '../types/general.types';

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

export const mockEntity = <T extends GuitarType[] | Review[]> (ids: string[] | number[], data: T) => {
  let restructuredIds = ids;
  if(ids instanceof Number) {
    restructuredIds = ids.map((line) => String(line));
  }

  if((data[0] as Review).guitarId) {
    return restructuredIds
      .map((line, index) => ({[line]: data[index] as Review}))
      .reduce((prev, current) => ({
        ...current,
        ...prev,
      }), {});
  } else {
    return restructuredIds
      .map((line, index) => ({[line]: data[index] as GuitarType}))
      .reduce((prev, current) => ({
        ...current,
        ...prev,
      }), {});
  }
};

export const removeObjectPropertyWithNull = (data: ParamObject): NoNullParamObject => {
  const newObject = {} as NoNullParamObject;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const indexes: number[] = [];
  values.forEach((line, index) => {
    if(line !== null) {
      indexes.push(index);
    }
  });

  const noNullKeys = indexes.map((line) => keys[line]) as KeysOfParamObject[];
  noNullKeys.forEach((key) => Object.assign(newObject, {[key]: data[key]}));

  return newObject;
};

export const isEscape = (keyCode: string) => {
  if(keyCode === KeyBoardCode.Esc.version1 || keyCode === KeyBoardCode.Esc.version2) {
    return true;
  } else {
    return false;
  }
};

export const isEnter = (keyCode: string) => {
  if(keyCode === KeyBoardCode.Enter.version1 || keyCode === KeyBoardCode.Enter.version2) {
    return true;
  } else {
    return false;
  }
};

export const removeCurrentElementFromArray = (currentElement: string, data: string[]) => {
  const copy = data.slice();
  copy.splice(data.findIndex((value) => value === currentElement), ONE);
  return copy;
};

export const getValueFromNonEmptyArray = (array: number[] | string[] | null) => {
  if(array && array.length !== 0) {
    return array.map((line) => String(line));
  } else {
    return null;
  }
};

export const translateFromNumberToString = (value: number | null) => {
  if(value) {
    return String(value);
  } else {
    return null;
  }
};

export const makeNoDuplication = (data: string[] | null, initial: string[] = []) => {
  if(data) {
    const isResultHasThisItem = (item:string) => initial.some((line) => line === item);

    data.forEach((line) => {
      if(!isResultHasThisItem(line)) {
        initial.push(line);
      }
    });
    return initial;
  } else {
    return null;
  }
};

export const isCurrentElementActive = <T>(element: T, dataArray: T[]) => dataArray.some((line) => line === element);
