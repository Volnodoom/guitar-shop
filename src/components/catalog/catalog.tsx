import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LoadingStatus, PagesName } from '../../const';
import { fetchGuitarsAction, fetchOneGuitarAction, fetchProductAction } from '../../store/data-products/data-products';
import { getGuitarsStatus, getOneGuitarStatus, getProductStatus } from '../../store/data-products/selectors-products';
import { AppDispatch } from '../../types/state.types';
import { basicGuitarMock } from '../../utils/mock-data/guitar-mock';
import { Breadcrumbs } from '../common/common';
import LoadingScreen from '../loading-screen/loading-screen';
import { Filtration, Pagination, Sorting, CardPreview } from './components/components';

function Catalog():JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const guitars = basicGuitarMock;
  const Astatus = useSelector(getGuitarsStatus);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Bstatus = useSelector(getOneGuitarStatus);
  const Cstatus = useSelector(getProductStatus);

  useEffect(() => {
    // dispatch(fetchProductAction(1));
    // dispatch(fetchOneGuitarAction(1));
    dispatch(fetchGuitarsAction());
  },[dispatch]);

  if(Astatus !== LoadingStatus.Succeeded) {
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
