import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LIMIT_GUITARS_PER_PAGE, LIMIT_GUITARS_PER_PAGE_DOUBLE, ONE, AppRoutes } from '../../../../const';
import * as selectorGuitars from '../../../../store/data-guitars/selectors-guitars';
import { useSetCatalogPageState } from '../../../../hooks/use-set-catalo-page/use-set-catalog-page';

function Pagination() {
  const totalGuitar = useSelector(selectorGuitars.getTotalNumber);
  const currentPage = useSelector(selectorGuitars.getCurrentPage);
  const [setPageState] = useSetCatalogPageState();
  const nextPage = currentPage + ONE;
  const previousPage = currentPage - ONE;

  const isPreviousBtnVisible = currentPage !== ONE && totalGuitar !== LIMIT_GUITARS_PER_PAGE_DOUBLE;
  const isNextBtnVisible = (totalGuitar as number)/(currentPage*LIMIT_GUITARS_PER_PAGE) > ONE
    &&
    totalGuitar !== LIMIT_GUITARS_PER_PAGE_DOUBLE;

  return(
    <div className="pagination page-content__pagination">
      {
        totalGuitar &&  totalGuitar > LIMIT_GUITARS_PER_PAGE
          ?
          <ul className="pagination__list">
            {
              isPreviousBtnVisible &&
                <li className="pagination__page pagination__page--prev" id="next">
                  <Link
                    className="link pagination__page-link"
                    to={AppRoutes.CatalogPageAbsolute(previousPage)}
                    onClick={() => setPageState(previousPage)}
                  >Назад
                  </Link>

                </li>
            }
            {
              Array
                .from({length: Math.ceil(totalGuitar/LIMIT_GUITARS_PER_PAGE)}, (element, index) => index + ONE)
                .map((line) => (
                  <li
                    className={`${currentPage === line ? 'pagination__page--active' : ''} pagination__page`}
                    key={line}
                  >
                    <Link
                      className="link pagination__page-link "
                      to={AppRoutes.CatalogPageAbsolute(line)}
                      onClick={() => setPageState(line)}
                    >{line}
                    </Link>
                  </li>
                ))
            }
            {
              isNextBtnVisible &&
              <li className="pagination__page pagination__page--next" id="next">
                <Link
                  className="link pagination__page-link"
                  to={AppRoutes.CatalogPageAbsolute(nextPage)}
                  onClick={() => setPageState(nextPage)}
                >Далее
                </Link>
              </li>
            }
          </ul>
          :
          ''
      }
    </div>
  );
}

export default Pagination;
