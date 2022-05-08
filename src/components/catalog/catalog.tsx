import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  PagesName } from '../../const';
import { AppDispatch } from '../../types/state.types';
import { basicGuitarMock } from '../../utils/mock-data/guitar-mock';
import { Breadcrumbs } from '../common/common';
import { Filtration, Pagination, Sorting, CardPreview } from './components/components';

function Catalog():JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const guitars = basicGuitarMock;


  useEffect(() => {

  },[dispatch]);


  // if( !== LoadingStatus.Succeeded) {
  //   return <LoadingScreen />;
  // }

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
