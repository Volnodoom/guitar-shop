import { PagesName } from '../../const';
import { Breadcrumbs } from '../common/common';
import { CartCardPreview, Coupon, Total } from './components/components';

function Cart(): JSX.Element {
  return(
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <Breadcrumbs pageContent={PagesName.Cart.en}/>
        <div className="cart">
          <CartCardPreview />
          <div className="cart__footer">
            <Coupon />
            <Total />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
