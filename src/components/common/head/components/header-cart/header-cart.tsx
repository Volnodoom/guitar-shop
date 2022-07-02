import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, CART_LINK, LINK_CURRENT, PagesName } from '../../../../../const';
import * as selectorCart from '../../../../../store/data-cart/selector-cart';
import { zIndexPosition } from '../../style-header';

function HeaderCart(): JSX.Element {
  const location = useLocation();

  const isCart = location.pathname.includes(PagesName.Cart.en.toLowerCase());

  const itemsNumberCart = useSelector(selectorCart.getTotalCartContentNumber);

  return(
    <Link
      className={isCart ? `${CART_LINK} ${LINK_CURRENT}` : CART_LINK}
      to={AppRoutes.CartAbsolute}
      aria-label="Корзина"
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
