import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, CART_LINK, LINK_CURRENT, PagesName } from '../../../../../const';
import * as selectorCart from '../../../../../store/data-cart/selector-cart';
import * as selectorGuitar from '../../../../../store/data-guitars/selectors-guitars';
import { setActiveTab } from '../../../../../store/data-guitars/data-guitars';
import { zIndexPosition } from '../../style-header';
import { useAppDispatch } from '../../../../../hooks/hook';

function HeaderCart(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const tabHead = useSelector(selectorGuitar.getActiveTab);
  const itemsNumberCart = useSelector(selectorCart.getTotalCartContentNumber);

  const isCart = location.pathname.includes(PagesName.Cart.en.toLowerCase());

  useEffect(() => {
    if(isCart) {
      dispatch(setActiveTab(PagesName.Cart.en));
    }
  }, [dispatch, isCart]);

  const handleCartClick = () => dispatch(setActiveTab(PagesName.Cart.en));

  return(
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
      {
        itemsNumberCart
          ?
          <span className="header__cart-count">{itemsNumberCart}</span>
          :
          ''
      }
    </Link>
  );
}

export default HeaderCart;
