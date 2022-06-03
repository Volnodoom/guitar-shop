import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as selectorQuery from '../../store/query-params/selector-query';
import { ParamObject } from '../../types/general.types';
import { removeObjectPropertyWithNull } from '../../utils/utils-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { QueryRoutes, SortingOrder, SortingSort } from '../../const';
import { setOrderBy, setSortBy } from '../../store/query-params/query-params';
import { useAppDispatch } from '../hook';

export const useCustomSearchParams = ()  => {
  const dispatch = useAppDispatch();
  const { pageNumber } = useParams<{pageNumber: string}>();
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentSort = useSelector(selectorQuery.getSort);
  const getCurrentOrder = useSelector(selectorQuery.getOrder);

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
  }, [dispatch, isNoOder, isNoSort, searchParams]);

  //second useEffect react on user interaction through UI
  useEffect(() => {
    const params: ParamObject = {
      [QueryRoutes.Sort]: getCurrentSort,
      [QueryRoutes.Order]: getCurrentOrder,
    };

    setSearchParams(
      removeObjectPropertyWithNull(params)
    );
  }, [pageNumber, getCurrentOrder, getCurrentSort, setSearchParams]);
};
