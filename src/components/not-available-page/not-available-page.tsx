import { Link } from 'react-router-dom';
import { AppRoutes, ONE } from '../../const';
import { nonAvailableDiv, nonAvailableLink, nonAvailableText } from './style-not-available-page';

function NotAvailablePage ():JSX.Element {
  return (
    <div className="page-content" style={nonAvailableDiv}>
      <h1 style={nonAvailableText}>
        404.
        <small> Page not found</small>
      </h1>
      <Link to={AppRoutes.CatalogPageAbsolute(ONE)} style={nonAvailableLink}>
        Go to catalog page
      </Link>
    </div>
  );
}

export default NotAvailablePage;
