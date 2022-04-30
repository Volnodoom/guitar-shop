import { PagesName } from '../../../const';

function Breadcrumbs(props: {pageContent: keyof typeof PagesName}) {
  const {pageContent} = props;

  return(
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href="./main.html">Главная</a>
      </li>
      <li className="breadcrumbs__item">
        <a className="link" href="./main.html">Каталог</a>
      </li>
      {
        pageContent !== PagesName.Catalog.en &&
        <li className="breadcrumbs__item">
          <a className="link">{PagesName[pageContent].ru}</a>
        </li>
      }
    </ul>
  );
}

export default Breadcrumbs;
