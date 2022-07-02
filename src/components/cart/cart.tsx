import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalKind, PagesName } from '../../const';
import * as selectorCart from '../../store/data-cart/selector-cart';
import { GuitarType } from '../../types/general.types';
import { Breadcrumbs, ModalFrame } from '../common/common';
import { CartCardPreview, Coupon, Total } from './components/components';
import * as selectorQuery from '../../store/query-params/selector-query';

function Cart(): JSX.Element {
  const cartProductList = useSelector(selectorCart.getCartContent);
  const redirectUrl = useSelector(selectorQuery.getCatalogWithQueryParamUrl);

  const [isModalActive, setIsModalActive] = useState(false);
  const [activeGuitar, setActiveGuitar] = useState<GuitarType | undefined>(undefined);

  const handleModalFrameCloseClick = () => {
    setIsModalActive(false);
    setActiveGuitar(undefined);
  };

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <Breadcrumbs pageContent={PagesName.Cart.en}/>

        <div className="cart">
          {
            cartProductList.length > 0

              ?

              cartProductList.map((line) => (
                <CartCardPreview
                  guitarInfo={line}
                  setModalFrame={setIsModalActive}
                  setGuitar={setActiveGuitar}
                  key={line.id}
                />))

              :
              <div className="cart-item">
                <div></div>
                <div></div>
                <div className="car__footer">
                  <p className="product-info__title">В корзине нет товаров</p>
                  <Link className="link" to={redirectUrl}>перейти в каталог товаров</Link>
                </div>
              </div>
          }
          <div className="cart__footer">
            <Coupon />
            <Total />
          </div>
        </div>

      </div>

      <ModalFrame
        onClose={handleModalFrameCloseClick}
        isOpen={isModalActive}
        modalKind={ModalKind.CartDelete}
        guitarDetails={activeGuitar}
      />
    </main>
  );
}

export default Cart;
