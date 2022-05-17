import { MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, CART_LINK, LINK_CURRENT, NAV_LINK, PagesName } from '../../../const';
import { useAppDispatch } from '../../../hooks/hook';
import { setActiveTab } from '../../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../../store/data-guitars/selectors-guitars';

function Header (): JSX.Element {
  const dispatch = useAppDispatch();
  const tabHead = useSelector(selectorGuitar.getActiveTab);
  const location = useLocation();

  const isCart = location.pathname.includes(PagesName.Cart.en.toLowerCase());

  useEffect(() => {
    if(isCart) {
      dispatch(setActiveTab(PagesName.Cart.en));
    }
  });

  const handleCatalogClick = () => dispatch(setActiveTab(PagesName.Catalog.en));
  const handleCartClick = () => dispatch(setActiveTab(PagesName.Cart.en));
  const handleInactiveLink = (evt: MouseEvent<HTMLAnchorElement>) => evt.preventDefault();

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoutes.Root}>
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className={
                  tabHead === PagesName.Catalog.en ? `${NAV_LINK} ${LINK_CURRENT}` : NAV_LINK
                }
                to={AppRoutes.Root}
                onClick={handleCatalogClick}
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
        <div className="form-search">
          <form className="form-search__form" id="form-search">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
          </ul>
          <button className="form-search__reset" type="reset" form="form-search">
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link
          className={
            tabHead === PagesName.Cart.en ? `${CART_LINK} ${LINK_CURRENT}` : CART_LINK
          }
          to={AppRoutes.Cart}
          aria-label="Корзина"
          onClick={handleCartClick}
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
