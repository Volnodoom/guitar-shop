import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GuitarSingleRu, GUITAR_CART_LIMIT, LOCAL_RU, ONE } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/hook';
import { updateCartContentNumber } from '../../../../store/data-cart/data-cart';
import { getCartQuantityForCurrentProduct } from '../../../../store/data-cart/selector-cart';
import { GuitarType } from '../../../../types/general.types';
import { State } from '../../../../types/state.types';
import { formatBaseImgUrl, formatHighDensityImgUrl } from '../../../../utils/utils-components';

type CartCardPreviewProps = {
  guitarInfo: GuitarType,
  setModalFrame: React.Dispatch<React.SetStateAction<boolean>>,
  setGuitar: React.Dispatch<React.SetStateAction<GuitarType | undefined>>,
}

function CartCardPreview({guitarInfo, setModalFrame, setGuitar}: CartCardPreviewProps): JSX.Element {
  const {
    id,
    name,
    previewImg,
    vendorCode,
    type,
    stringCount,
    price,
  } = guitarInfo;

  const dispatch = useAppDispatch();

  const itemQuantity = useSelector((state: State) => getCartQuantityForCurrentProduct(state, id));

  const [finishItemPrice, setFinishItemPrice] = useState((itemQuantity as number)*price);
  const [currentValue, setCurrentValue] = useState(itemQuantity);

  useEffect(() => {
    setFinishItemPrice((itemQuantity as number)*price);
  }, [itemQuantity, price]);

  const handleDeleteCartItem = () => {
    setModalFrame(true);
    setGuitar(guitarInfo);
  };

  const handleAddOneClick = () => {
    if(itemQuantity) {
      if(currentValue && (currentValue >= GUITAR_CART_LIMIT)) {
        dispatch(updateCartContentNumber({id: String(id), value: GUITAR_CART_LIMIT}));
        setCurrentValue(GUITAR_CART_LIMIT);
      } else {
        dispatch(updateCartContentNumber({id: String(id), value: itemQuantity + ONE}));
        setCurrentValue(itemQuantity + ONE);
      }
    }
  };

  const handleReduceOneClick = () => {
    if(itemQuantity) {
      if(itemQuantity === ONE) {
        handleDeleteCartItem();
      } else {
        dispatch(updateCartContentNumber({id: String(id), value: itemQuantity - ONE}));
        setCurrentValue(itemQuantity - ONE);
      }
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);

    if(value > 0 && value <= GUITAR_CART_LIMIT) {
      dispatch(updateCartContentNumber({id: String(id), value: value}));
      setCurrentValue(value);
    } else if (value > GUITAR_CART_LIMIT) {
      dispatch(updateCartContentNumber({id: String(id), value: GUITAR_CART_LIMIT}));
      setCurrentValue(GUITAR_CART_LIMIT);
    } else {
      handleDeleteCartItem();
    }
  };

  return(
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        onClick={handleDeleteCartItem}
        aria-label="Удалить"
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>

      <div className="cart-item__image">
        <img
          src={`/${formatBaseImgUrl(previewImg)}`}
          srcSet={`/${formatBaseImgUrl(formatHighDensityImgUrl(previewImg))}`}
          alt={`${name}.`}
          width="55"
          height="130"
        />
      </div>

      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{GuitarSingleRu[type]}, {stringCount} струнная</p>
      </div>

      <div className="cart-item__price">{price.toLocaleString(LOCAL_RU)} ₽</div>
      <div className="quantity cart-item__quantity">

        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleReduceOneClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>

        <input
          className="quantity__input"
          type="number"
          value={currentValue ? currentValue : 0}
          onChange={handleInputChange}
          id="2-count"
          name="2-count"
          max="99"
        />

        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleAddOneClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{finishItemPrice.toLocaleString(LOCAL_RU)} ₽</div>
    </div>
  );
}

export default CartCardPreview;
