import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as selectorQuery from '../../store/query-params/selector-query';
import { ParamObject } from '../../types/general.types';
import { removeObjectPropertyWithNull } from '../../utils/utils-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { QueryRoutes, SortingOrder, SortingSort } from '../../const';
import { setFilterByName, setFilterByType, setOrderBy, setPriceRangeEnd, setPriceRangeStart, setSortBy } from '../../store/query-params/query-params';
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
  const getCurrentFilterName = useSelector(selectorQuery.getFilterByName);
  const getCurrentFilterType = useSelector(selectorQuery.getFilterByType);

  const isNoSort = !searchParams.has(QueryRoutes.Sort);
  const isNoOder = !searchParams.has(QueryRoutes.Order);

  //first useEffect react on user input in url
  useEffect(() => {
    if(searchParams && searchParams.has(QueryRoutes.Sort)) {
      dispatch(setSortBy(searchParams.get(QueryRoutes.Sort) as SortingSort));
      isNoOder && dispatch(setOrderBy(SortingOrder.Decrease));
    }
    if(searchParams && searchParams.has(QueryRoutes.Order)) {
      dispatch(setOrderBy(searchParams.get(QueryRoutes.Order) as SortingOrder));
      isNoSort && dispatch(setSortBy(SortingSort.Price));
    }
    if(searchParams && searchParams.has(QueryRoutes.PriceStart)) {
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
    if(searchParams && searchParams.has(QueryRoutes.PriceEnd)) {
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
    if(searchParams && searchParams.has(QueryRoutes.Name)) {
      dispatch(setFilterByName(searchParams.get(QueryRoutes.Name)));
    }
    if(searchParams && searchParams.has(QueryRoutes.Type)) {
      dispatch(setFilterByType(searchParams.get(QueryRoutes.Type)));
    }
  }, [dispatch, isNoOder, isNoSort, priceRange, searchParams]);

  //second useEffect react on user interaction through UI
  useEffect(() => {
    const params: ParamObject = {
      [QueryRoutes.Sort]: getCurrentSort,
      [QueryRoutes.Order]: getCurrentOrder,
      [QueryRoutes.PriceStart]: getCurrentPriceStart,
      [QueryRoutes.PriceEnd]: getCurrentPriceEnd,
      [QueryRoutes.Name]: getCurrentFilterName,
      [QueryRoutes.Type]: getCurrentFilterType,
    };

    setSearchParams(
      removeObjectPropertyWithNull(params)
    );
  }, [
    pageNumber,
    getCurrentOrder,
    getCurrentSort,
    setSearchParams,
    getCurrentPriceStart,
    getCurrentPriceEnd,
    getCurrentFilterName,
    getCurrentFilterType
  ]);
};
