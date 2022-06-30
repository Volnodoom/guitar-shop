import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalKind, PagesName } from '../../const';
import { getCartContent } from '../../store/data-cart/selector-cart';
import { GuitarType } from '../../types/general.types';
import { Breadcrumbs, ModalFrame } from '../common/common';
import { CartCardPreview, Coupon, Total } from './components/components';

function Cart(): JSX.Element {
  const cartProductList = useSelector(getCartContent);

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
          {cartProductList.map((line) => (
            <CartCardPreview
              guitarInfo={line}
              setModalFrame={setIsModalActive}
              setGuitar={setActiveGuitar}
              key={line.id}
            />))}
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
