import { LIMIT_GUITARS_PER_PAGE, ONE } from '../../const';
import { setCurrentPage } from '../../store/data-guitars/data-guitars';
import { setItemRangeStart } from '../../store/query-params/query-params';
import { useAppDispatch } from '../hook';
import { useEffect,  useState } from 'react';

export const useSetCatalogPageState = (initialState = null) => {
  const dispatch = useAppDispatch();
  const [pageState, setPageState] = useState< number | null>(initialState);

  useEffect(() => {
    if(pageState !== null) {
      dispatch(setItemRangeStart(LIMIT_GUITARS_PER_PAGE*(pageState - ONE)));
      dispatch(setCurrentPage(pageState));

    }
  }, [dispatch, pageState]);

  return [setPageState];
};
