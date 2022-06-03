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

  useEffect(() => {
    if(searchParams && searchParams.has(QueryRoutes.Sort)) {
      dispatch(setSortBy(searchParams.get(QueryRoutes.Sort) as SortingSort));
    }
    if(searchParams && searchParams.has(QueryRoutes.Order)) {
      dispatch(setOrderBy(searchParams.get(QueryRoutes.Order) as SortingOrder));
    }
  }, [dispatch, searchParams]);


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
