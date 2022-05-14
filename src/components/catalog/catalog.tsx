import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  LIMIT_GUITARS_PER_PAGE, LoadingStatus, PagesName } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { useSetCatalogPageState } from '../../hooks/use-set-catalo-page/use-set-catalog-page';
import { fetchProductsAction } from '../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../store/data-guitars/selectors-guitars';
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
  const [setPageState] = useSetCatalogPageState();

  const isPageExist = totalGuitarsFromServer && Number(pageNumber) * LIMIT_GUITARS_PER_PAGE <= totalGuitarsFromServer;

  useEffect(() => {
    if (pageNumber) {
      setPageState(Number(pageNumber));
    }
  },[
    pageNumber,
    setPageState
  ]);

  useEffect(() => {
    if (pageNumber) {
      if(totalGuitarsFromServer === null || !guitarsAccordingToPage) {
        dispatch(fetchProductsAction());
      }
    }
  },[
    dispatch,
    guitarsAccordingToPage,
    totalGuitarsFromServer,
    pageNumber,
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
                  guitarsAccordingToPage.map((line) => {
                    if (line !== undefined) {
                      return <CardPreview itemInfo={line} key={line.id}/>;
                    }
                  })
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
