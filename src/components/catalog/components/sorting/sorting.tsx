import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AriaLabelSorting, QueryRoutes, SortingOrder, SortingSort } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../../../store/data-guitars/data-guitars';
import { setOrderBy, setSortBy } from '../../../../store/query-params/query-params';
import * as selectorQuery from '../../../../store/query-params/selector-query';

function Sorting():JSX.Element {
  const dispatch = useAppDispatch();
  const getCurrentSort = useSelector(selectorQuery.getSort);
  const getCurrentOrder = useSelector(selectorQuery.getOrder);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();


  const handleSortClick = (evt: MouseEvent<HTMLButtonElement>) => {
    switch ((evt.target as HTMLButtonElement).ariaLabel) {
      case AriaLabelSorting.ByPrice:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setSortBy(SortingSort.Price));
        setSearchParams({[QueryRoutes.Sort]: SortingSort.Price});
        getCurrentOrder === null
        && dispatch(setOrderBy(SortingOrder.Decrease))
        && setSearchParams({[QueryRoutes.Order]: SortingOrder.Decrease});
        break;

      case AriaLabelSorting.ByPopular:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setSortBy(SortingSort.Popularity));
        setSearchParams({[QueryRoutes.Sort]: SortingSort.Popularity});
        getCurrentOrder === null
        && dispatch(setOrderBy(SortingOrder.Decrease))
        && setSearchParams({[QueryRoutes.Order]: SortingOrder.Decrease});
        break;

      case AriaLabelSorting.ByOrderUp:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setOrderBy(SortingOrder.Increase));
        setSearchParams({[QueryRoutes.Order]: SortingOrder.Increase});
        getCurrentSort === null
        && dispatch(setSortBy(SortingSort.Price))
        && setSearchParams({[QueryRoutes.Sort]: SortingSort.Price});
        break;

      case AriaLabelSorting.ByOrderDown:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setOrderBy(SortingOrder.Decrease));
        setSearchParams({[QueryRoutes.Order]: SortingOrder.Decrease});
        getCurrentSort === null
        && dispatch(setSortBy(SortingSort.Price))
        && setSearchParams({[QueryRoutes.Sort]: SortingSort.Price});
        break;

      default:
        break;
    }
  };

  return(
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">

        <button
          className={`${getCurrentSort === SortingSort.Price && 'catalog-sort__type-button--active'} catalog-sort__type-button`}
          aria-label={AriaLabelSorting.ByPrice}
          onClick={handleSortClick}
        >по цене
        </button>

        <button
          className={`${getCurrentSort === SortingSort.Popularity && 'catalog-sort__type-button--active'} catalog-sort__type-button`}
          aria-label={AriaLabelSorting.ByPopular}
          onClick={handleSortClick}
        >по популярности
        </button>

      </div>
      <div className="catalog-sort__order">

        <button
          className={`${getCurrentOrder === SortingOrder.Increase && 'catalog-sort__order-button--active'} catalog-sort__order-button catalog-sort__order-button--up`}
          aria-label={AriaLabelSorting.ByOrderUp}
          onClick={handleSortClick}
        >
        </button>

        <button
          className={`${getCurrentOrder === SortingOrder.Decrease && 'catalog-sort__order-button--active'} catalog-sort__order-button catalog-sort__order-button--down`}
          aria-label={AriaLabelSorting.ByOrderDown}
          onClick={handleSortClick}
        >
        </button>

      </div>
    </div>
  );
}

export default Sorting;
