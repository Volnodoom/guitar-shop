import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, LINK_CURRENT, LogoPosition, NAV_LINK, PagesName } from '../../../../../const';
import { Logo } from '../../../common';

function HeaderNavigation(): JSX.Element {
  const location = useLocation();

  const isCart = location.pathname.includes(PagesName.Cart.en.toLowerCase());

  const handleInactiveLink = (evt: MouseEvent<HTMLAnchorElement>) => evt.preventDefault();

  return(
    <>
      <Logo position={LogoPosition.Header} />

      <nav className="main-nav">
        <ul className="main-nav__list">
          <li>
            <Link
              className={!isCart ? `${NAV_LINK} ${LINK_CURRENT}` : NAV_LINK}
              to={AppRoutes.Root}
            >Каталог
            </Link>
          </li>
          <li>
            <Link
              className="link main-nav__link"
              to={AppRoutes.Root}
              data-inactive
              onClick={handleInactiveLink}
            >Где купить?
            </Link>
          </li>
          <li>
            <Link
              className="link main-nav__link"
              to={AppRoutes.Root}
              data-inactive
              onClick={handleInactiveLink}
            >О компании
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default HeaderNavigation;
