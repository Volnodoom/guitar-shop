type ModalReviewSuccessProps= {
  onClose: () => void,
}

function ModalReviewSuccess(props: ModalReviewSuccessProps) {
  const {
    onClose,
  } = props;


  return(
    <div className="modal__content">
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button
          className="button button--small modal__button modal__button--review"
          onClick={onClose}
        >К покупкам!
        </button>
      </div>
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

export default ModalReviewSuccess;
