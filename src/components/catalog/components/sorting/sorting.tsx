import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { SortingDataset, QueryRoutes, SortingOrder, SortingSort } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../../../store/data-guitars/data-guitars';
import { setOrderBy, setSortBy } from '../../../../store/query-params/query-params';
import * as selectorQuery from '../../../../store/query-params/selector-query';

function Sorting():JSX.Element {
  const dispatch = useAppDispatch();
  const getCurrentSort = useSelector(selectorQuery.getSort);
  const getCurrentOrder = useSelector(selectorQuery.getOrder);
  const [, setSearchParams] = useSearchParams();

  const hasSorting = Boolean(getCurrentSort);
  const hasOrdering = Boolean(getCurrentOrder);

  const handleSortClick = (evt: MouseEvent<HTMLButtonElement>) => {
    switch ((evt.target as HTMLButtonElement).dataset.sorting) {
      case SortingDataset.ByPrice:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setSortBy(SortingSort.Price));
        hasOrdering
        && setSearchParams({
          [QueryRoutes.Sort]: SortingSort.Price,
          [QueryRoutes.Order]: getCurrentOrder as SortingOrder,
        });
        !hasOrdering
        && dispatch(setOrderBy(SortingOrder.Decrease))
        && setSearchParams({
          [QueryRoutes.Sort]: SortingSort.Price,
          [QueryRoutes.Order]: SortingOrder.Decrease
        });
        break;

      case SortingDataset.ByPopular:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setSortBy(SortingSort.Popularity));
        hasOrdering
        && setSearchParams({
          [QueryRoutes.Sort]: SortingSort.Popularity,
          [QueryRoutes.Order]: getCurrentOrder as SortingOrder,
        });
        !hasOrdering
        && dispatch(setOrderBy(SortingOrder.Decrease))
        && setSearchParams({
          [QueryRoutes.Sort]: SortingSort.Popularity,
          [QueryRoutes.Order]: SortingOrder.Decrease
        });
        break;

      case SortingDataset.ByOrderUp:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setOrderBy(SortingOrder.Increase));
        hasSorting
        && setSearchParams({
          [QueryRoutes.Order]: SortingOrder.Increase,
          [QueryRoutes.Sort]: getCurrentSort as SortingSort,
        });
        !hasSorting
        && dispatch(setSortBy(SortingSort.Price))
        && setSearchParams({
          [QueryRoutes.Order]: SortingOrder.Increase,
          [QueryRoutes.Sort]: SortingSort.Price,
        });
        break;

      case SortingDataset.ByOrderDown:
        dispatch(clearGuitarsIdPerPage());
        dispatch(setOrderBy(SortingOrder.Decrease));
        hasSorting
        && setSearchParams({
          [QueryRoutes.Order]: SortingOrder.Decrease,
          [QueryRoutes.Sort]: getCurrentSort as SortingSort,
        });
        !hasSorting
        && dispatch(setSortBy(SortingSort.Price))
        && setSearchParams({
          [QueryRoutes.Order]: SortingOrder.Decrease,
          [QueryRoutes.Sort]: SortingSort.Price,
        });
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
          aria-label="по цене"
          onClick={handleSortClick}
          data-sorting={SortingDataset.ByPrice}
        >по цене
        </button>

        <button
          className={`${getCurrentSort === SortingSort.Popularity && 'catalog-sort__type-button--active'} catalog-sort__type-button`}
          aria-label="по популярности"
          onClick={handleSortClick}
          data-sorting={SortingDataset.ByPopular}
        >по популярности
        </button>

      </div>
      <div className="catalog-sort__order">

        <button
          className={`${getCurrentOrder === SortingOrder.Increase && 'catalog-sort__order-button--active'} catalog-sort__order-button catalog-sort__order-button--up`}
          aria-label="по возрастанию"
          onClick={handleSortClick}
          data-sorting={SortingDataset.ByOrderUp}
        >
        </button>

        <button
          className={`${getCurrentOrder === SortingOrder.Decrease && 'catalog-sort__order-button--active'} catalog-sort__order-button catalog-sort__order-button--down`}
          aria-label="по убыванию"
          onClick={handleSortClick}
          data-sorting={SortingDataset.ByOrderDown}
        >
        </button>

      </div>
    </div>
  );
}

export default Sorting;
