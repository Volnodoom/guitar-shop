import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes, CART_LINK, LINK_CURRENT, LoadingStatus, LogoPosition, NAV_LINK, PagesName } from '../../../const';
import { useAppDispatch } from '../../../hooks/hook';
import { fetchUserSearchAction, setActiveTab, setOneGuitarStatus, setUserSearch } from '../../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../../store/data-guitars/selectors-guitars';
import { Logo } from '../common';
import { zIndexPosition } from './style-header';

function Header (): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState('');
  const [searchMemory, setSearchMemory] = useState<string[]>([]);

  const tabHead = useSelector(selectorGuitar.getActiveTab);
  const userSearchResult = useSelector(selectorGuitar.getUserGuitarSearch);

  const isCart = location.pathname.includes(PagesName.Cart.en.toLowerCase());

  useEffect(() => {
    if(isCart) {
      dispatch(setActiveTab(PagesName.Cart.en));
    }
  });


  const handleCatalogClick = () => dispatch(setActiveTab(PagesName.Catalog.en));
  const handleCartClick = () => dispatch(setActiveTab(PagesName.Cart.en));
  const handleInactiveLink = (evt: MouseEvent<HTMLAnchorElement>) => evt.preventDefault();

  const handleNameSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentValue = evt.target.value;
    const resetInput = () => {
      dispatch(setUserSearch([]));
      setSearchName('');
      setSearchMemory([]);
    };

    const isMatchMemory = (valueToCheck: string) => searchMemory.some((line) => line === valueToCheck);

    if(currentValue === '') {
      resetInput();
    }
    if(currentValue !== '' && searchName !== '') {
      if(userSearchResult.length !== 0) {
        setSearchMemory((previous) => [...previous, searchName]);
      }
    }

    if(userSearchResult.length === 0 && searchName === '') {
      dispatch(fetchUserSearchAction(currentValue));
    } else if(currentValue.includes(searchName) && userSearchResult.length !== 0) {
      dispatch(fetchUserSearchAction(currentValue));
    } else if(isMatchMemory(currentValue)) {
      dispatch(fetchUserSearchAction(currentValue));
    }
    setSearchName(currentValue);
  };

  const handleResultSearchClick = (id: number) => () => {
    navigate(AppRoutes.GuitarAbsolute(id));
    setSearchName('');
    //it is required to refresh one guitar status because we could drive from one product to
    //another without refreshing site
    dispatch(setOneGuitarStatus(LoadingStatus.Idle));
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo position={LogoPosition.Header} />
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
            <input
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              onChange={handleNameSearch}
              value={searchName}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list ${!searchName  && 'hidden'}`}>
            {
              userSearchResult && userSearchResult.length > 0
                ?
                userSearchResult
                  .map((guitar) => (
                    <li
                      className="form-search__select-item"
                      tabIndex={0}
                      key={`${guitar.name}-${guitar.id}`}
                      onClick={handleResultSearchClick(guitar.id)}
                    >{guitar.name}
                    </li>))
                :
                <li>Товаров не найдено</li>
            }
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
          style={zIndexPosition}
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true" data-testid={'icon-basket'}>
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
