import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes, PagesName } from '../../../const';
import * as selector from '../../../store/data-guitars/selectors-guitars';

type BreadcrumbsProps = {
  pageContent: keyof typeof PagesName,
  ProductTitle?: string,
};

function Breadcrumbs(props: BreadcrumbsProps) {
  const {pageContent, ProductTitle} = props;
  const currentPage = useSelector(selector.getCurrentPage);

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
        <Link className="link" to={AppRoutes.CatalogPageAbsolute(currentPage)}>Каталог</Link>
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
