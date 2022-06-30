import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ModalKind, ModalStatus, ONE, PAGE, PRODUCT } from '../../../const';
import { useAppDispatch } from '../../../hooks/hook';
import { useEscPress } from '../../../hooks/use-esc-press/use-esc-press';
import { useFocusTrap } from '../../../hooks/use-focus-trap/use-focus-trap';
import { addCartContent, removeCartContent, removeCartContentNumber, updateCartContentNumber } from '../../../store/data-cart/data-cart';
import * as selectorCart from '../../../store/data-cart/selector-cart';
import { DiveRef, GuitarType } from '../../../types/general.types';
import { State } from '../../../types/state.types';
import { ModalCart, ModalReview, ModalSuccess } from './components/components';

type ModalFrameProps = {
  onClose: () => void,
  isOpen: boolean,
  modalKind: ModalKind,
  guitarDetails?: GuitarType,
}

function ModalFrame({onClose, isOpen, modalKind, guitarDetails}: ModalFrameProps): JSX.Element {
  const modalRef = useRef<DiveRef>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isCatalog = location.pathname.includes(PAGE);
  const isDetailedCard = location.pathname.includes(PRODUCT);

  const idAsNumber = guitarDetails && Number(guitarDetails.id);
  const cartQuantityCurrentItem = useSelector((state: State) => selectorCart.getCartQuantityForCurrentProduct(state, idAsNumber));


  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.Idl);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(true);
  }, [isOpen]);

  const handleFrameClose = () => {
    onClose();
    setModalStatus(ModalStatus.Idl);
    document.body.classList.remove('scroll-lock');
    document.body.classList.remove('scroll-lock-ios');
  };

  const handleFrameOpen = () => {
    document.body.classList.add('scroll-lock');
    document.body.classList.add('scroll-lock-ios');
  };

  useEscPress(isOpen, handleFrameClose);
  useFocusTrap(modalRef, modalStatus, isOpen);

  useEffect(() => {
    if(isOpen) {
      handleFrameOpen();
    }
  },[isOpen]);


  const handleOverlayClick = (evt: MouseEvent<HTMLElement>) => {
    if(evt.target) {
      handleFrameClose();
    }
  };

  const handleModalReviewSuccess = () => {
    setIsActive(false);
    setModalStatus(ModalStatus.SuccessReview);
  };

  const handleCartAddClick = () => {
    if(!guitarDetails) {
      return;
    }

    setIsActive(false);
    setModalStatus(ModalStatus.SuccessCart);
    dispatch(addCartContent(guitarDetails));

    if(isCatalog && cartQuantityCurrentItem === 0) {
      dispatch(updateCartContentNumber({id: String(guitarDetails.id), value: ONE}));
    }

    if(isDetailedCard && cartQuantityCurrentItem !== null) {
      dispatch(updateCartContentNumber({id: String(guitarDetails.id), value: cartQuantityCurrentItem + ONE}));
    }
  };

  const handleCartDeleteClick = () => {
    if(guitarDetails) {
      dispatch(removeCartContent(guitarDetails));
      dispatch(removeCartContentNumber({guitarId: guitarDetails.id}));
    }
  };

  return(
    <div
      className={
        `modal ${isOpen && 'is-active'} ${
          modalKind === ModalKind.Review
          &&
          isActive
          &&
          'modal--review'
        } ${
          (modalStatus === ModalStatus.SuccessReview || modalStatus === ModalStatus.SuccessCart) && 'modal--success'
        }`
      }
      ref={modalRef}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={handleOverlayClick} data-testid={'overlay'}>
        </div>
        {
          modalKind === ModalKind.Review
            &&
            isActive
            &&
            <ModalReview
              onClose={handleFrameClose}
              onSuccess={handleModalReviewSuccess}
            />
        }

        {
          modalKind === ModalKind.CartAdd
            &&
            isActive
            &&
            guitarDetails
            &&
            <ModalCart
              modalType={ModalKind.CartAdd}
              onAdd={handleCartAddClick}
              guitarDetails={guitarDetails}
              onClose={handleFrameClose}
            />
        }

        {
          modalKind === ModalKind.CartDelete
            &&
            guitarDetails
            &&
            <ModalCart
              modalType={ModalKind.CartDelete}
              onDelete={handleCartDeleteClick}
              guitarDetails={guitarDetails}
              onClose={handleFrameClose}
            />
        }

        {
          modalStatus === ModalStatus.SuccessReview
            &&
            <ModalSuccess onClose={handleFrameClose} />
        }

        {
          modalStatus === ModalStatus.SuccessCart
            &&
            <ModalSuccess modalType={ModalKind.Cart} onClose={handleFrameClose} />
        }
      </div>
    </div>
  );
}

export default ModalFrame;
