import { useRef } from 'react';
import { GuitarSingleRu, LOCAL_RU, ModalKind } from '../../../../../const';
import { useFocusTrap } from '../../../../../hooks/use-focus-trap/use-focus-trap';
import { DiveRef, GuitarType } from '../../../../../types/general.types';
import { formatBaseImgUrl, formatHighDensityImgUrl } from '../../../../../utils/utils-components';

type ModalCartProp = {
  guitarDetails: GuitarType,
  onAdd?: () => void,
  onDelete?: () => void,
  onClose: () => void,
  modalType?: ModalKind.CartAdd | ModalKind.CartDelete,
}

function ModalCart ({guitarDetails, onAdd, onDelete, onClose, modalType = ModalKind.CartAdd}: ModalCartProp): JSX.Element {
  const {
    previewImg,
    name,
    vendorCode,
    stringCount,
    price,
    type,
  } = guitarDetails;

  const modalRef = useRef<DiveRef>(null);

  useFocusTrap(modalRef);

  const handleDeleteClick = () => {
    if(onDelete) {
      onDelete();
      onClose();
    }
  };

  return (
    <div className ="modal__content" ref={modalRef}>
      {
        modalType === ModalKind.CartDelete
          ?
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          :
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
      }
      <div className="modal__info">
        <img className="modal__img"
          src={`/${formatBaseImgUrl(previewImg)}`}
          srcSet={`/${formatBaseImgUrl(formatHighDensityImgUrl(previewImg))}`}
          width="67"
          height="137"
          alt={name}
        />

        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">{`Артикул: ${vendorCode}`}</p>
          <p className="modal__product-params">{`${GuitarSingleRu[type]}, ${stringCount} струнная`}</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{price.toLocaleString(LOCAL_RU)} ₽</span>
          </p>
        </div>
      </div>

      {
        modalType === ModalKind.CartDelete

          ?

          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={handleDeleteClick}
            >Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onClose}
            >Продолжить покупки
            </button>
          </div>

          :

          <div className="modal__button-container">
            <button
              className="button button--red button--big modal__button modal__button--add"
              onClick={onAdd}
            >Добавить в корзину
            </button>
          </div>
      }

      <button
        className="modal__close-btn button-cross"
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
      >
        <span className="button-cross__icon"></span>
        <span className="modal__close-btn-interactive-area"></span>
      </button>
    </div>
  );
}

export default ModalCart;
