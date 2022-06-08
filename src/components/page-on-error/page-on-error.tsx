import { Link } from 'react-router-dom';
import { AppRoutes, ERROR_404, ONE, PAGE_NOT_FOUND } from '../../const';
import { useAppDispatch } from '../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../store/data-guitars/data-guitars';
import { clearQueryParams } from '../../store/query-params/query-params';
import { nonAvailableDiv, nonAvailableLink, nonAvailableText } from './style-page-on-error';

type PageOnErrorProps ={
  error?: string,
  message?: string,
}

function PageOnError ({error = ERROR_404, message = PAGE_NOT_FOUND }: PageOnErrorProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clearQueryParams());
    dispatch(clearGuitarsIdPerPage());
  };

  return (
    <div className="page-content" style={nonAvailableDiv}>
      <h1 style={nonAvailableText}>
        {error}
        <small>{message}</small>
      </h1>
      <Link to={AppRoutes.CatalogPageAbsolute(ONE)} style={nonAvailableLink} onClick={handleClick}>
        Go to catalog page
      </Link>
    </div>
  );
}

export default PageOnError;
