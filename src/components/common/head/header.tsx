import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes, CART_LINK, LINK_CURRENT, LoadingStatus, LogoPosition, NAV_LINK, PagesName, SEARCH_BAR_PLACEHOLDER } from '../../../const';
import { useAppDispatch } from '../../../hooks/hook';
import { useDebouncedValue } from '../../../hooks/use-debounced-value/use-debounced-value';
import { fetchUserSearchAction, setActiveTab, setOneGuitarStatus, setUserSearch } from '../../../store/data-guitars/data-guitars';
import * as selectorGuitar from '../../../store/data-guitars/selectors-guitars';
import { setReviewsStatus } from '../../../store/data-reviews/data-reviews';
import { isEnter, isEscape } from '../../../utils/utils-components';
import { Logo } from '../common';
import { zIndexPosition } from './style-header';

function Header (): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState('');
  const [searchMemoryMatch, setSearchMemoryMatch] = useState<string[]>([]);
  const [searchMemoryUnMatch, setSearchMemoryUnMatch] = useState<string[]>([]);
  const [currentVisual, setCurrentVisual] = useState('');
  const [realTimeInput, setRealTimeInput] = useState('');

  const debouncedValue = useDebouncedValue(realTimeInput);

  const tabHead = useSelector(selectorGuitar.getActiveTab);
  const userSearchResult = useSelector(selectorGuitar.getUserGuitarSearch);

  const isCart = location.pathname.includes(PagesName.Cart.en.toLowerCase());

  useEffect(() => {
    if(isCart) {
      dispatch(setActiveTab(PagesName.Cart.en));
    }
  });

  useEffect(() => {
    const hasMemoryMatch = (valueToCheck: string) => searchMemoryMatch.some((line) => line === valueToCheck);
    const hasMemoryUnMatch = (valueToCheck: string) => searchMemoryUnMatch.some((line) => line === valueToCheck);

    if(debouncedValue === '') {
      resetInput();
    }
    if(debouncedValue !== '') {
      if(userSearchResult.length !== 0) {
        setSearchMemoryMatch((previous) => [...previous, searchName]);
      } else if(userSearchResult.length === 0) {
        setSearchMemoryUnMatch((previous) => [...previous, searchName]);
      }
    }

    if(userSearchResult.length === 0 && searchName === '' && debouncedValue !== '') {
      dispatch(fetchUserSearchAction(debouncedValue));
    } else if(debouncedValue.includes(searchName) && userSearchResult.length !== 0) {
      dispatch(fetchUserSearchAction(debouncedValue));
    } else if(hasMemoryMatch(debouncedValue)) {
      dispatch(fetchUserSearchAction(debouncedValue));
    } else if(!debouncedValue.includes(searchName) && !hasMemoryUnMatch(debouncedValue)) {
      dispatch(fetchUserSearchAction(debouncedValue));
    }

    setSearchName(debouncedValue);
  }, [debouncedValue, dispatch]);

  const resetInput = () => {
    setSearchName('');
    setCurrentVisual('');
    setRealTimeInput('');
    dispatch(setUserSearch([]));
    setSearchMemoryMatch([]);
    setSearchMemoryUnMatch([]);
  };

  const pickupOneResult = (id: number) => {
    navigate(AppRoutes.GuitarAbsolute(id));
    setCurrentVisual('');
    setSearchName('');
    setRealTimeInput('');
    dispatch(setOneGuitarStatus(LoadingStatus.Idle));
    dispatch(setReviewsStatus(LoadingStatus.Idle));
  };

  const handleCatalogClick = () => dispatch(setActiveTab(PagesName.Catalog.en));
  const handleCartClick = () => dispatch(setActiveTab(PagesName.Cart.en));
  const handleInactiveLink = (evt: MouseEvent<HTMLAnchorElement>) => evt.preventDefault();

  const handleNameSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setRealTimeInput(evt.target.value);
    setCurrentVisual(evt.target.value);
  };

  //it is required to refresh oneGuitarStatus for both guitars and comments data to prevent site crash
  const handleResultSearchClick = (id: number) => () => {
    pickupOneResult(id);
  };

  const handleSearchResultReset = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    resetInput();
  };

  const handleButtonInactiveClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  const handleKeyboardClick = (id?: number) => (evt: KeyboardEvent) => {
    if (isEscape(evt.code)) {
      resetInput();
    }
    if(id && isEnter(evt.code)) {
      pickupOneResult(id);
    }
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo position={LogoPosition.Header} />

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className={tabHead === PagesName.Catalog.en ? `${NAV_LINK} ${LINK_CURRENT}` : NAV_LINK}
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
            <button className="form-search__submit" type="submit" onClick={handleButtonInactiveClick}>
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
              placeholder={SEARCH_BAR_PLACEHOLDER}
              onChange={handleNameSearch}
              value={currentVisual}
              onKeyDown={handleKeyboardClick()}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>

          <ul className={`form-search__select-list ${searchName ? 'list-opened' : 'hidden'}`}>
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
                      onKeyDown={handleKeyboardClick(guitar.id)}
                    >{guitar.name}
                    </li>))
                :
                <li>Товаров не найдено</li>
            }
          </ul>

          <button className="form-search__reset" type="reset" form="form-search" onClick={handleSearchResultReset}>
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>

        <Link
          className={tabHead === PagesName.Cart.en ? `${CART_LINK} ${LINK_CURRENT}` : CART_LINK}
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
