import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/hook';
import { fetchCouponCheckAction } from '../../../../store/data-cart/action-cart';
import { setCouponStatus, updateCoupon } from '../../../../store/data-cart/data-cart';
import * as selectorCart from '../../../../store/data-cart/selector-cart';
import { checkStatusFailed, checkStatusLoading, checkStatusSuccess } from '../../../../utils/utils-components';

function Coupon() {
  const dispatch = useAppDispatch();
  const fetchStatus = useSelector(selectorCart.getCouponStatus);
  const cartProductList = useSelector(selectorCart.getCartContent);

  const [currentValue, setCurrentValue] = useState('');

  const isFetchSucceed = checkStatusSuccess(fetchStatus);
  const isFetchFailed = checkStatusFailed(fetchStatus);
  const isFetchLoading = checkStatusLoading(fetchStatus);

  useEffect(() => {
    if(cartProductList.length === 0) {
      dispatch(updateCoupon(null));
      dispatch(setCouponStatus(LoadingStatus.Idle));
    }
  }, [cartProductList.length, dispatch]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const result = value.replace(/\s/ig, '').toLowerCase();
    setCurrentValue(result);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(fetchCouponCheckAction({coupon: currentValue}));
  };

  return(
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>

      <form className="coupon__form" id="coupon-form" onSubmit={handleFormSubmit}>
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>

          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={currentValue}
            onChange={handleInputChange}
          />

          {
            isFetchSucceed
            &&
            <p className="form-input__message form-input__message--success">Промокод принят</p>
          }

          {
            isFetchFailed
            &&
            <p className="form-input__message form-input__message--error">Неверный промокод</p>
          }
        </div>
        <button className="button button--big coupon__button">{isFetchLoading ? 'Вычисляем ...' : 'Применить'}</button>
      </form>
    </div>
  );
}

export default Coupon;
