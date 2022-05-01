import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, PagesName, ONE } from '../../../const';

type BreadcrumbsProps = {
  pageContent: keyof typeof PagesName,
  ProductTitle?: string,
};

function Breadcrumbs(props: BreadcrumbsProps) {
  const {pageContent, ProductTitle} = props;

  const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
    if (evt.currentTarget as HTMLLIElement) {
      evt.preventDefault();
    }
  };

  return(
    <ul className="breadcrumbs page-content__breadcrumbs" >
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoutes.Root}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={`/${AppRoutes.Catalog(ONE)}`}>Каталог</Link>
      </li>
      {
        pageContent !== PagesName.Catalog.en &&
        <li className="breadcrumbs__item" onClick={handleClick} >
          <Link className="link" to="">{
            PagesName[pageContent].en === PagesName.Guitar.en
              ?
              ProductTitle
              :
              PagesName[pageContent].ru
          }
          </Link>
        </li>
      }
    </ul>
  );
}

export default Breadcrumbs;
