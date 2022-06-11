import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  GENERAL_ERROR_MESSAGE, LIMIT_GUITARS_PER_PAGE, PagesName } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { useCustomSearchParams } from '../../hooks/use-custom-search-params/use-custom-search-params';
import { useSetCatalogPageState } from '../../hooks/use-set-catalog-page-state/use-set-catalog-page-state';
import { fetchPriceExtreme, fetchProductsAction } from '../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../store/data-guitars/selectors-guitars';
import * as selectorQuery from '../../store/query-params/selector-query';
import { checkStatusFailed, checkStatusLoading } from '../../utils/utils-components';
import { Breadcrumbs } from '../common/common';
import LoadingScreen from '../loading-screen/loading-screen';
import PageOnError from '../page-on-error/page-on-error';
import { Filtration, Pagination, Sorting, CardPreview } from './components/components';

function Catalog():JSX.Element {
  const { pageNumber } = useParams<{pageNumber: string}>();
  const dispatch = useAppDispatch();
  const isDataLoading = checkStatusLoading(useSelector(selectorGuitar.getGuitarsStatus));
  const isDataFailed = checkStatusFailed(useSelector(selectorGuitar.getGuitarsStatus));
  const totalGuitarsFromServer = useSelector(selectorGuitar.getTotalNumber);
  const guitarsAccordingToPage = useSelector(selectorGuitar.getGuitarsPerPage);
  const priceRange = useSelector(selectorGuitar.getPriceExtremes);

  const getCurrentPriceStart = useSelector(selectorQuery.getPriceRangeStart);
  const getCurrentPriceEnd = useSelector(selectorQuery.getPriceRangeEnd);
  const getFilterStringNumber = useSelector(selectorQuery.getFilterStringNumber);
  const getCurrentFilterType = useSelector(selectorQuery.getFilterByType);

  const [setPageState] = useSetCatalogPageState();

  useCustomSearchParams();

  const isPageExist = totalGuitarsFromServer
    && Number(pageNumber) <= Math.ceil(totalGuitarsFromServer/LIMIT_GUITARS_PER_PAGE);

  useEffect(() => {
    if (pageNumber) {
      setPageState(Number(pageNumber));
      if(totalGuitarsFromServer === null || !guitarsAccordingToPage) {
        dispatch(fetchProductsAction());
      }
      if(priceRange === null) {
        dispatch(fetchPriceExtreme());
      }
    }
  },[
    dispatch,
    guitarsAccordingToPage,
    totalGuitarsFromServer,
    pageNumber,
    setPageState,
    getCurrentPriceStart,
    getCurrentPriceEnd,
    getFilterStringNumber,
    getCurrentFilterType
  ]);

  if(isDataLoading || totalGuitarsFromServer === null) {
    return <LoadingScreen />;
  }

  if(isPageExist === false) {
    return <PageOnError />;
  }

  if(isDataFailed) {
    return <PageOnError error={''} message={GENERAL_ERROR_MESSAGE}/>;
  }


  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs pageContent={PagesName.Catalog.en}/>
        <div className="catalog">
          <Filtration />
          <Sorting />
          {
            guitarsAccordingToPage
            &&
            guitarsAccordingToPage.length > 0
            &&
            guitarsAccordingToPage.every((line) => line !== undefined)
              ?
              <div className="cards catalog__cards">
                {
                  guitarsAccordingToPage
                    .map((line) => (line && <CardPreview itemInfo={line} key={line.id}/>))
                }
              </div>
              :
              <div className='catalog__cards'>
                <b>Товаров по вашему запросу не найдено</b>
              </div>
          }
          <Pagination />
        </div>
      </div>
    </main>
  );
}

export default Catalog;
