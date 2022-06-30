import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes, ModalKind, PAGE, PagesName, PRODUCT } from '../../../../../const';
import { useAppDispatch } from '../../../../../hooks/hook';
import { setActiveTab } from '../../../../../store/data-guitars/data-guitars';
import * as selectorQuery from '../../../../../store/query-params/selector-query';

type ModalReviewSuccessProps= {
  onClose: () => void,
  modalType?: ModalKind.Review | ModalKind.Cart,
}

function ModalSuccess({onClose, modalType = ModalKind.Review,}: ModalReviewSuccessProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const redirectUrl = useSelector(selectorQuery.getCatalogWithQueryParamUrl);

  const isCatalog = location.pathname.includes(PAGE);
  const isGuitar = location.pathname.includes(PRODUCT);

  const handleCartRedirectClick = () => {
    dispatch(setActiveTab(PagesName.Cart.en));
    navigate(AppRoutes.CartAbsolute);
    onClose();
  };

  const handleKeepPurchaseClick = () => {
    if(isCatalog) {
      onClose();
    }
    if(isGuitar) {
      navigate(redirectUrl);
      onClose();
    }
  };

  return(
    <div className="modal__content">
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>

      {
        modalType === ModalKind.Cart
          ?
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          :
          <p className="modal__message">Спасибо за ваш отзыв!</p>

      }

      {
        modalType === ModalKind.Cart

          ?

          <div className="modal__button-container modal__button-container--add">
            <button
              className="button button--small modal__button"
              onClick={handleCartRedirectClick}
            >Перейти в корзину
            </button>

            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={handleKeepPurchaseClick}
            >Продолжить покупки
            </button>
          </div>

          :

          <div className="modal__button-container modal__button-container--review">
            <button
              className="button button--small modal__button modal__button--review"
              onClick={onClose}
            >К покупкам!
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

export default ModalSuccess;
