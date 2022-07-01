import { createSelector } from 'reselect';
import { AppRoutes, NameSpace, QueryRoutes } from '../../const';
import { State } from '../../types/state.types';

export const getItemStart = (state: State) => state[NameSpace.QueryParams].itemRangeStart;
export const getSort = (state: State) => state[NameSpace.QueryParams].sortBy;
export const getOrder = (state: State) => state[NameSpace.QueryParams].orderBy;
export const getPriceRangeStart = (state: State) => state[NameSpace.QueryParams].priceRangeStart;
export const getPriceRangeEnd = (state: State) => state[NameSpace.QueryParams].priceRangeEnd;
export const getFilterStringNumber = (state: State) => state[NameSpace.QueryParams].filterByString;
export const getFilterByType = (state: State) => state[NameSpace.QueryParams].filterByType;

export const getCatalogWithQueryParamUrl = createSelector(
  getSort,
  getOrder,
  getPriceRangeStart,
  getPriceRangeEnd,
  getFilterStringNumber,
  getFilterByType,
  (state: State) => state[NameSpace.DataGuitars].currentPage,
  (sort, order, priceStart, priceEnd, stringNumber, productType, page) => {
    const allParams = [
      {type: QueryRoutes.Sort, value: sort},
      {type: QueryRoutes.Order, value: order},
      {type: QueryRoutes.PriceStart, value: priceStart},
      {type: QueryRoutes.PriceEnd, value: priceEnd},
      {type: QueryRoutes.StringNumber, value: stringNumber},
      {type: QueryRoutes.Type, value: productType},
    ];

    const noNullParams = allParams.filter(
      (line) => {
        if(Array.isArray(line.value)) {
          return (line.value as Array<number | string>).length !== 0;
        } else {
          return line.value !== null;
        }
      }
    );

    if(noNullParams.length !== 0) {
      const formattedData = noNullParams.map((line) => {
        if(Array.isArray(line.value)) {
          return (line.value as Array<number | string>).reduce((prevValue:string, curValue: string | number) => {
            if(prevValue.length === 0) {
              return prevValue.concat(`${line.type}=${curValue}`);
            } else {
              return prevValue.concat(`&${line.type}=${curValue}`);
            }
          }, '');
        } else {
          return `${line.type}=${line.value}`;
        }
      });

      const resultedSearchUrl = formattedData.reduce((prevString, currString, currentIndex) => {
        if(currentIndex === 0) {
          return prevString.concat(currString);
        } else {
          return prevString.concat(`&${currString}`);
        }
      }, '');

      return `${AppRoutes.CatalogPageAbsolute(page)}?${resultedSearchUrl}`;
    } else {
      return AppRoutes.CatalogPageAbsolute(page);
    }
  }
);
