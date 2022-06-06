import { Link } from 'react-router-dom';
import { AppRoutes, ONE } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../store/data-guitars/data-guitars';
import { clearQueryParams } from '../../store/query-params/query-params';
import { nonAvailableDiv, nonAvailableLink, nonAvailableText } from './style-not-available-page';

function NotAvailablePage ():JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clearQueryParams());
    dispatch(clearGuitarsIdPerPage());
  };

  return (
    <div className="page-content" style={nonAvailableDiv}>
      <h1 style={nonAvailableText}>
        404.
        <small> Page not found</small>
      </h1>
      <Link to={AppRoutes.CatalogPageAbsolute(ONE)} style={nonAvailableLink} onClick={handleClick}>
        Go to catalog page
      </Link>
    </div>
  );
}

export default NotAvailablePage;
