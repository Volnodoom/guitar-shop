import { PagesName } from '../../const';
import { Breadcrumbs } from '../common/common';
import { Filtration, Pagination, Sorting, CardPreview } from './components/components';

function Catalog():JSX.Element {
  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs pageContent={PagesName.Catalog.en}/>
        <div className="catalog">
          <Filtration />
          <Sorting />
          <div className="cards catalog__cards">
            <CardPreview />
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
}

export default Catalog;
