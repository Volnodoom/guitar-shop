import { Link } from 'react-router-dom';
import { AppRoutes, ONE } from '../../../../const';

function Pagination() {
  // const {pageNumber} = useParams<{pageNumber: string}>();
  // const [currentPage, setCurrentPage] = useState(ONE);
  // const [pageCount, setpageCount] = useState(ONE);
  // const hasDataForOneNextPage = true;
  // const hasDataForTwoNextPages = true;

  // if(hasDataForOneNextPage) {
  //   setpageCount((prev) => prev + ONE);
  // }
  // if(hasDataForTwoNextPages) {
  //   setpageCount((prev) => prev + ONE);
  // }

  // const handleLinkClick = (evt: MouseEvent<HTMLLIElement>) => {

  // }

  return(
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--active">
          <Link className="link pagination__page-link" to={`/${AppRoutes.Catalog(ONE)}`}>{ONE}</Link>
        </li>
        <li className="pagination__page">
          <Link className="link pagination__page-link" to="2">2</Link>
        </li>
        <li className="pagination__page">
          <Link className="link pagination__page-link" to="3">3</Link>
        </li>
        <li className="pagination__page pagination__page--next" id="next">
          <Link className="link pagination__page-link" to="2">Далее</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
