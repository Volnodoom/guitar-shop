import { Fragment, MouseEvent } from 'react';
import { RATING_OPTIONS } from '../../../../const';

type ModalReviewProps = {
  guitarInfo: {
    name: string,
    id: number,
  },
  isModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function ModalReview(props: ModalReviewProps) {
  const {
    name,
    // id,
  } = props.guitarInfo;

  const {isModalOpen} = props;

  const handleOverlayClick = (evt: MouseEvent<HTMLElement>) => {
    if(evt.target) {
      isModalOpen(false);
    }
  };

  return(
    <div className="modal is-active modal--review">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={handleOverlayClick}></div>
        <div className="modal__content" >
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
          <form className="form-review">
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                <p className="form-review__warning">Заполните поле</p>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {
                    RATING_OPTIONS
                      .map((line) => (
                        <Fragment key={`modal-review-fragment-${line.rating}`}>
                          <input className="visually-hidden" id={`star-${line.rating}`} name="rate" type="radio" value={line.rating} />
                          <label className="rate__label" htmlFor={`star-${line.rating}`} title={line.value} ></label>
                        </Fragment>
                      ))
                  }
                  <p className="rate__message">Поставьте оценку</p>
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
            <input className="form-review__input" id="adv" type="text" autoComplete="off" />
            <p className="form-review__warning">Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input className="form-review__input" id="disadv" type="text" autoComplete="off" />
            <p className="form-review__warning">Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off"></textarea>
            <p className="form-review__warning">Заполните поле</p>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => isModalOpen(false)}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReview;
