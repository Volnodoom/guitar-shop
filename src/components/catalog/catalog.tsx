import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  LoadingStatus, PagesName } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { fetchGuitarsAction } from '../../store/data-guitars/data-guitars';
import * as selector from '../../store/data-guitars/selectors-guitars';
import { Breadcrumbs } from '../common/common';
import LoadingScreen from '../loading-screen/loading-screen';
import { Filtration, Pagination, Sorting, CardPreview } from './components/components';

function Catalog():JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useSelector(selector.getGuitars);
  const isDataLoaded = useSelector(selector.getGuitarsStatus) === LoadingStatus.Succeeded;


  useEffect(() => {
    dispatch(fetchGuitarsAction());
  },[dispatch]);


  if(!isDataLoaded) {
    return <LoadingScreen />;
  }

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs pageContent={PagesName.Catalog.en}/>
        <div className="catalog">
          <Filtration />
          <Sorting />
          <div className="cards catalog__cards">
            {
              guitars.map((line) => <CardPreview itemInfo={line} key={line.id}/>)
            }
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
}

export default Catalog;
