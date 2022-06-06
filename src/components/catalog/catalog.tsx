import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  LIMIT_GUITARS_PER_PAGE, LoadingStatus, PagesName } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { useCustomSearchParams } from '../../hooks/use-custom-search-params/use-custom-search-params';
import { useSetCatalogPageState } from '../../hooks/use-set-catalo-page/use-set-catalog-page';
import { fetchPriceExtreme, fetchProductsAction } from '../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../store/data-guitars/selectors-guitars';
import * as selectorQuery from '../../store/query-params/selector-query';
import { Breadcrumbs } from '../common/common';
import LoadingScreen from '../loading-screen/loading-screen';
import NotAvailablePage from '../not-available-page/not-available-page';
import { Filtration, Pagination, Sorting, CardPreview } from './components/components';

function Catalog():JSX.Element {
  const { pageNumber } = useParams<{pageNumber: string}>();
  const dispatch = useAppDispatch();
  const isDataLoaded = useSelector(selectorGuitar.getGuitarsStatus) === LoadingStatus.Succeeded;
  const totalGuitarsFromServer = useSelector(selectorGuitar.getTotalNumber);
  const guitarsAccordingToPage = useSelector(selectorGuitar.getGuitarsPerPage);
  const priceRange = useSelector(selectorGuitar.getPriceExtremes);

  const getCurrentPriceStart = useSelector(selectorQuery.getPriceRangeStart);
  const getCurrentPriceEnd = useSelector(selectorQuery.getPriceRangeEnd);
  const getCurrentFilterName = useSelector(selectorQuery.getFilterByName);
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
    getCurrentFilterName,
    getCurrentFilterType
  ]);

  if(!isDataLoaded || totalGuitarsFromServer === null) {
    return <LoadingScreen />;
  }

  if(isPageExist === false) {
    return <NotAvailablePage />;
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
