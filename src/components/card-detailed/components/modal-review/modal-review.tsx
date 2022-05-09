import { ChangeEvent, Dispatch, FormEventHandler, Fragment, MouseEvent, SetStateAction, useState } from 'react';
import { ModalStatus, RATING_OPTIONS, ReviewFormIdFields } from '../../../../const';
import { UserReviewPost } from '../../../../types/general.types';
import { checkIsReviewFormValid } from '../../../../utils/utils-components';
import { blockMargin } from './modal-review.style';

type ModalReviewProps = {
  guitarInfo: {
    name: string,
    id: number,
  },
  setStatus: Dispatch<SetStateAction<ModalStatus>>,
  onClose: () => void,
}

function ModalReview(props: ModalReviewProps) {
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState<string | number>('');
  const [userAdvantages, setUserAdvantages] = useState('');
  const [userDisadvantages, setUserDisadvantages] = useState('');
  const [userComments, setUserComments] = useState('');

  const {
    name,
    id,
  } = props.guitarInfo;

  const {
    setStatus,
    onClose,
  } = props;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const userReview: UserReviewPost = {
      guitarId: id,
      userName,
      advantage: userAdvantages,
      disadvantage: userDisadvantages,
      comment: userComments,
      rating: Number(userRating),
    };

    if(checkIsReviewFormValid(userReview)) {
      // send data to server
      setStatus(ModalStatus.Success);
    }
  };

  const handleFieldChange = (evt: ChangeEvent<HTMLElement>) => {
    const inputEvent = evt.target as HTMLInputElement;
    const textAreaEvent = evt.target as HTMLTextAreaElement;

    if (inputEvent.id === ReviewFormIdFields.UserName) {
      setUserName(inputEvent.value);
    } else if (inputEvent.id === ReviewFormIdFields.UserAdv) {
      setUserAdvantages(inputEvent.value);
    } else if (inputEvent.id === ReviewFormIdFields.UserDisAdv) {
      setUserDisadvantages(inputEvent.value);
    } else if (textAreaEvent.id === ReviewFormIdFields.UserComment) {
      setUserComments(textAreaEvent.value);
    }
  };

  const handleRatingClick = (evt: MouseEvent<HTMLInputElement>) => {
    setUserRating(
      Number((evt.target as HTMLInputElement).value)
    );
  };

  return(
    <div className="modal__content" >
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
      <form className="form-review" onSubmit={handleSubmit}>
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">

            <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
            <input
              className="form-review__input form-review__input--name"
              id="user-name"
              type="text"
              autoComplete="off"
              onChange={handleFieldChange}
            />
            {userName.trim() === '' && <p className="form-review__warning">Заполните поле</p>}
          </div>

          <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">
              {
                RATING_OPTIONS
                  .map((line) => (
                    <Fragment key={`modal-review-fragment-${line.rating}`}>
                      <input
                        className="visually-hidden"
                        id={`star-${line.rating}`}
                        name="rate" type="radio"
                        value={line.rating}
                        onClick={handleRatingClick}
                        defaultChecked={line.value === userRating}
                      />
                      <label className="rate__label" htmlFor={`star-${line.rating}`} title={line.value} ></label>
                    </Fragment>
                  ))
              }
              {String(userRating).trim() === '' && <p className="rate__message">Поставьте оценку</p>}
            </div>
          </div>
        </div>
        <div style={blockMargin}>
          <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
          <input
            className="form-review__input"
            id="adv"
            type="text"
            autoComplete="off"
            onChange={handleFieldChange}
          />
          {userAdvantages.trim() === '' && <p className="form-review__warning">Заполните поле</p>}
        </div>

        <div style={blockMargin}>
          <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
          <input
            className="form-review__input"
            id="disadv"
            type="text"
            autoComplete="off"
            onChange={handleFieldChange}
          />
          {userDisadvantages.trim() === '' && <p className="form-review__warning">Заполните поле</p>}
        </div>

        <div style={blockMargin}>
          <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
          <textarea
            className="form-review__input form-review__input--textarea"
            id="comment"
            rows={10}
            autoComplete="off"
            onChange={handleFieldChange}
          >
          </textarea>
          {userComments.trim() === '' && <p className="form-review__warning">Заполните поле</p>}
        </div>

        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
      </form>
      <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onClose}>
        <span className="button-cross__icon"></span>
        <span className="modal__close-btn-interactive-area"></span>
      </button>
    </div>
  );
}

export default ModalReview;