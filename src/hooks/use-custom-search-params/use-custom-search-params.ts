import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as selectorQuery from '../../store/query-params/selector-query';
import { KeysOfParamObject, ParamObject, QueryParamsWithArrayData } from '../../types/general.types';
import { getValueFromNonEmptyArray, makeNoDuplication, removeObjectPropertyWithNull, translateFromNumberToString } from '../../utils/utils-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { QueryRoutes, SortingOrder, SortingSort } from '../../const';
import { addFilterByString, addFilterByType, setOrderBy, setPriceRangeEnd, setPriceRangeStart, setSortBy } from '../../store/query-params/query-params';
import { useAppDispatch } from '../hook';
import * as selectorGuitar from '../../store/data-guitars/selectors-guitars';

export const useCustomSearchParams = ()  => {
  const dispatch = useAppDispatch();
  const { pageNumber } = useParams<{pageNumber: string}>();
  const [searchParams, setSearchParams] = useSearchParams();

  const priceRange = useSelector(selectorGuitar.getPriceExtremes);
  const getCurrentSort = useSelector(selectorQuery.getSort);
  const getCurrentOrder = useSelector(selectorQuery.getOrder);
  const getCurrentPriceStart = useSelector(selectorQuery.getPriceRangeStart);
  const getCurrentPriceEnd = useSelector(selectorQuery.getPriceRangeEnd);
  const getCurrentStringNumber = (useSelector(selectorQuery.getFilterStringNumber));
  const getCurrentFilterType = useSelector(selectorQuery.getFilterByType);

  const isNoSort = !searchParams.has(QueryRoutes.Sort);
  const isNoOder = !searchParams.has(QueryRoutes.Order);

  //first useEffect react on user input in url
  useEffect(() => {
    const hasQueryParam = (queryType: KeysOfParamObject) => searchParams && searchParams.has(queryType);
    const hasArrayQueryParam = (queryType: QueryParamsWithArrayData) =>
      hasQueryParam(queryType) &&  searchParams.getAll(queryType).length !== 0;

    if(hasQueryParam(QueryRoutes.Sort)) {
      dispatch(setSortBy(searchParams.get(QueryRoutes.Sort) as SortingSort));
      isNoOder && dispatch(setOrderBy(SortingOrder.Decrease));
    }
    if(hasQueryParam(QueryRoutes.Order)) {
      dispatch(setOrderBy(searchParams.get(QueryRoutes.Order) as SortingOrder));
      isNoSort && dispatch(setSortBy(SortingSort.Price));
    }
    if(hasQueryParam(QueryRoutes.PriceStart)) {
      const startRange = Number(searchParams.get(QueryRoutes.PriceStart));
      const endRange = Number(searchParams.get(QueryRoutes.PriceEnd));

      if(priceRange && startRange < priceRange.min) {
        dispatch(setPriceRangeStart(priceRange.min));
      } else if (priceRange && startRange > priceRange.max) {
        dispatch(setPriceRangeStart(priceRange.max));
      } else if (endRange && startRange > endRange) {
        dispatch(setPriceRangeStart(endRange));
      } else {
        dispatch(setPriceRangeStart(
          Number(searchParams.get(QueryRoutes.PriceStart))
        ));
      }
    }
    if(hasQueryParam(QueryRoutes.PriceEnd)) {
      const endRange = Number(searchParams.get(QueryRoutes.PriceEnd));

      if(priceRange && endRange < priceRange.min) {
        dispatch(setPriceRangeEnd(priceRange.min));
      } else if (priceRange && endRange > priceRange.max) {
        dispatch(setPriceRangeEnd(priceRange.max));
      } else {
        dispatch(setPriceRangeEnd(
          Number(searchParams.get(QueryRoutes.PriceEnd))
        ));
      }
    }
    if(hasArrayQueryParam(QueryRoutes.Type)) {
      searchParams
        .getAll(QueryRoutes.Type)
        .forEach((param) => {
          const isStoreHasItem = getCurrentFilterType.some((value) => value === param);
          if(!isStoreHasItem) {
            dispatch(addFilterByType(param));
          }
        });
    }
    if(hasArrayQueryParam(QueryRoutes.StringNumber)) {
      searchParams
        .getAll(QueryRoutes.StringNumber)
        .forEach((param) => {
          const isStoreHasItem = getCurrentStringNumber.some((value) => value === Number(param));
          if(!isStoreHasItem) {
            dispatch(addFilterByString(Number(param)));
          }
        });
    }
  }, [dispatch, getCurrentFilterType, getCurrentStringNumber, isNoOder, isNoSort, priceRange, searchParams]);

  //second useEffect react on user interaction through UI
  useEffect(() => {
    const params: ParamObject = {
      [QueryRoutes.Sort]: getCurrentSort,
      [QueryRoutes.Order]: getCurrentOrder,
      [QueryRoutes.PriceStart]: translateFromNumberToString(getCurrentPriceStart),
      [QueryRoutes.PriceEnd]: translateFromNumberToString(getCurrentPriceEnd),
      [QueryRoutes.Type]: makeNoDuplication(getValueFromNonEmptyArray(getCurrentFilterType)),
      [QueryRoutes.StringNumber]: makeNoDuplication(getValueFromNonEmptyArray(getCurrentStringNumber)),
    };

    setSearchParams(
      removeObjectPropertyWithNull(params)
    );
  }, [pageNumber, getCurrentOrder, getCurrentSort, setSearchParams, getCurrentPriceStart, getCurrentPriceEnd, getCurrentStringNumber, getCurrentFilterType]);
};
