import { Filtration, Pagination, Sorting } from './components/components';
import { CardPreview } from '../card/card';

function Catalog():JSX.Element {
  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">Каталог</a>
          </li>
        </ul>
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
