import { toast } from 'react-toastify';
import { ChangeEvent, FormEventHandler, Fragment, MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus, RATING_OPTIONS, ReviewFormIdFields } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/hook';
import { useIdGetProductInfo } from '../../../../hooks/use-id-get-product-info/use-id-get-product-info';
import { saveCommentAction, setCommentStatus } from '../../../../store/data-reviews/data-reviews';
import * as selector from '../../../../store/data-reviews/selectors-reviews';
import { GuitarType, UserReviewPost } from '../../../../types/general.types';
import { checkIsReviewFormValid, checkStatusFailed, checkStatusLoading, checkStatusSuccess } from '../../../../utils/utils-components';
import { blockMargin } from './modal-review.style';

type ModalReviewProps = {
  onSuccess: () => void,
  onClose: () => void,
}

function ModalReview(props: ModalReviewProps) {
  const {
    onSuccess,
    onClose,
  } = props;

  const dispatch = useAppDispatch();
  const [guitar] = useIdGetProductInfo();

  const commentStatus = useSelector(selector.getSaveCommentStatus);
  const isCommentSuccess = checkStatusSuccess(commentStatus);
  const isCommentLoading = checkStatusLoading(commentStatus);
  const isCommentFailed = checkStatusFailed(commentStatus);

  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState<string | number>('');
  const [userAdvantages, setUserAdvantages] = useState('');
  const [userDisadvantages, setUserDisadvantages] = useState('');
  const [userComments, setUserComments] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if(isCommentLoading) {
      setIsDisabled(true);
    }
    if (isCommentSuccess) {
      onSuccess();
      setIsDisabled(false);
      dispatch(setCommentStatus(LoadingStatus.Idle));
    }
    if(isCommentFailed) {
      setIsDisabled(false);
      toast.error('Не удалось отправить отзыв');
    }
  }, [dispatch,
    isCommentFailed,
    isCommentLoading,
    isCommentSuccess,
    onSuccess
  ]);

  const {
    name,
    id,
  } = guitar as GuitarType;

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
      dispatch(saveCommentAction(userReview));
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
              data-testid={'input-name'}
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
                        data-testid={`rate-star-${line.rating}`}
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
            data-testid={'input-adv'}
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
            data-testid={'input-disadv'}
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
            data-testid={'input-textarea'}
          >
          </textarea>
          {userComments.trim() === '' && <p className="form-review__warning">Заполните поле</p>}
        </div>

        <button
          className="button button--medium-20 form-review__button"
          type="submit"
          disabled={isDisabled}
        >{isCommentLoading ? 'Отправляем...' : 'Отправить отзыв'}
        </button>
      </form>
      <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onClose}>
        <span className="button-cross__icon"></span>
        <span className="modal__close-btn-interactive-area"></span>
      </button>
    </div>
  );
}

export default ModalReview;
