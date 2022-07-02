import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LOCAL_RU } from '../../../../const';
import * as selectorCart from '../../../../store/data-cart/selector-cart';

function Total() {
  const cartGuitars = useSelector(selectorCart.getCartContent);
  const discount = useSelector(selectorCart.getCoupon);
  const cartGuitarQuantity = useSelector(selectorCart.getCartContentNumbers);

  const [totalPrice, setTotalPrice] = useState(0);
  const [resultPrice, setResultPrice] = useState(0);
  const [discountSize, setDiscountSize] = useState(0);

  useEffect(() => {
    if(cartGuitarQuantity && cartGuitars) {
      const prices = Object.entries(cartGuitarQuantity)
        .map(([key, value]) => {
          const price = cartGuitars.find((line) => line.id === Number(key))?.price;
          return (price as number) * Number(value);
        });

      const calculationResult = prices.reduce((prevValue, curValue) => prevValue + curValue, 0);
      setTotalPrice(calculationResult);

      if(discount) {
        setDiscountSize(calculationResult * discount / 100);
        setResultPrice(calculationResult - discountSize);
      } else {
        setResultPrice(calculationResult);
      }
    }
  }, [cartGuitarQuantity, cartGuitars, discount, discountSize]);


  return(
    <div className="cart__total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        {
          cartGuitarQuantity === null
            ?
            <span className="cart__total-value">0 ₽</span>
            :
            <span className="cart__total-value">{totalPrice.toLocaleString(LOCAL_RU)} ₽</span>
        }
      </p>

      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        {
          discount === null
            ?
            <span className="cart__total-value cart__total-value--bonus">0 ₽</span>
            :
            <span className="cart__total-value cart__total-value--bonus">- {discountSize.toLocaleString(LOCAL_RU)} ₽</span>
        }
      </p>

      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        {
          cartGuitarQuantity === null
            ?
            <span className="cart__total-value cart__total-value--payment">0 ₽</span>
            :
            <span className="cart__total-value cart__total-value--payment">{resultPrice.toLocaleString(LOCAL_RU)} ₽</span>
        }
      </p>
      <button className="button button--red button--big cart__order-button">Оформить заказ</button>
    </div>
  );
}

export default Total;
