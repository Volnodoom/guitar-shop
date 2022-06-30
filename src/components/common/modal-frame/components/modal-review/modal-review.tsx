import { toast } from 'react-toastify';
import { ChangeEvent, FormEventHandler, Fragment, MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus, RATING_OPTIONS, ReviewFormField } from '../../../../../const';
import { useAppDispatch } from '../../../../../hooks/hook';
import { useIdGetProductInfo } from '../../../../../hooks/use-id-get-product-info/use-id-get-product-info';
import { setCommentStatus } from '../../../../../store/data-reviews/data-reviews';
import * as selector from '../../../../../store/data-reviews/selectors-reviews';
import { DiveRef, GuitarType, InvalidFormArray, UserReviewPost } from '../../../../../types/general.types';
import { checkIsReviewFormValid, checkStatusFailed, checkStatusLoading, checkStatusSuccess } from '../../../../../utils/utils-components';
import { blockMargin, elementHidden, positionRelative, positionWaringAbsolute } from './modal-review.style';
import { saveCommentAction } from '../../../../../store/data-reviews/actions-reviews';
import { useFocusTrap } from '../../../../../hooks/use-focus-trap/use-focus-trap';

type ModalReviewProps = {
  onSuccess: () => void,
  onClose: () => void,
}

function ModalReview(props: ModalReviewProps) {
  const {
    onSuccess,
    onClose,
  } = props;

  const modalRef = useRef<DiveRef>(null);
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
  const [invalidField, setInvalidField] = useState<InvalidFormArray>([]);

  useFocusTrap(modalRef);

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

  const checkInvalidForm = (userReview:UserReviewPost): InvalidFormArray => {
    const invalidValues: InvalidFormArray = [];
    if(userReview.userName === '') {
      invalidValues.push(ReviewFormField.UserName);
    }
    if(userReview.advantage === '') {
      invalidValues.push(ReviewFormField.Advantage);
    }
    if(userReview.disadvantage === '') {
      invalidValues.push(ReviewFormField.Disadvantage);
    }
    if(userReview.comment === '') {
      invalidValues.push(ReviewFormField.Comment);
    }
    if(userReview.rating === 0) {
      invalidValues.push(ReviewFormField.Rating);
    }
    return invalidValues;
  };


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
    } else {
      setInvalidField(
        checkInvalidForm(userReview)
      );
    }
  };

  const handleFieldChange = (evt: ChangeEvent<HTMLElement>) => {
    const inputEvent = evt.target as HTMLInputElement;
    const textAreaEvent = evt.target as HTMLTextAreaElement;

    if (inputEvent.id === ReviewFormField.UserName) {
      setUserName(inputEvent.value);
    } else if (inputEvent.id === ReviewFormField.Advantage) {
      setUserAdvantages(inputEvent.value);
    } else if (inputEvent.id === ReviewFormField.Disadvantage) {
      setUserDisadvantages(inputEvent.value);
    } else if (textAreaEvent.id === ReviewFormField.Comment) {
      setUserComments(textAreaEvent.value);
    }
  };

  const handleRatingClick = (evt: MouseEvent<HTMLInputElement>) => {
    setUserRating(
      Number((evt.target as HTMLInputElement).value)
    );
  };

  if(!guitar) {
    return <p> </p>;
  }

  return(
    <div className="modal__content" ref={modalRef}>
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
      <form className="form-review" onSubmit={handleSubmit}>
        <div className="form-review__wrapper">
          <div style={{...positionRelative, ...blockMargin}} className="form-review__name-wrapper">

            <label className="form-review__label form-review__label--required" htmlFor={ReviewFormField.UserName}>Ваше Имя</label>
            <input
              className="form-review__input form-review__input--name"
              id={ReviewFormField.UserName}
              type="text"
              autoComplete="off"
              onChange={handleFieldChange}
              data-testid={'input-name'}
            />
            <p
              style={invalidField.some((line) => line === ReviewFormField.UserName) ? positionWaringAbsolute : {...positionWaringAbsolute, ...elementHidden}}
              className={invalidField.some((line) => line === ReviewFormField.UserName) ? 'form-review__warning' : ''}
            >Заполните поле
            </p>
          </div>

          <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div style={{...positionRelative, ...blockMargin}} className="rate rate--reverse">
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
              <p
                style={invalidField.some((line) => line === ReviewFormField.Rating) ? positionWaringAbsolute : {...positionWaringAbsolute, ...elementHidden}}
                className={invalidField.some((line) => line === ReviewFormField.Rating) ? 'rate__message' : ''}
              >Поставьте оценку
              </p>
            </div>
          </div>
        </div>

        <div style={{...positionRelative, ...blockMargin}}>
          <label className="form-review__label form-review__label--required" htmlFor={ReviewFormField.Advantage}>Достоинства</label>
          <input
            className="form-review__input"
            id={ReviewFormField.Advantage}
            type="text"
            autoComplete="off"
            onChange={handleFieldChange}
            data-testid={'input-adv'}
          />
          <p
            style={invalidField.some((line) => line === ReviewFormField.Advantage) ? positionWaringAbsolute : {...positionWaringAbsolute, ...elementHidden}}
            className={invalidField.some((line) => line === ReviewFormField.Advantage) ? 'form-review__warning' : ''}
          >Заполните поле
          </p>
        </div>

        <div style={{...positionRelative, ...blockMargin}}>
          <label className="form-review__label form-review__label--required" htmlFor={ReviewFormField.Disadvantage}>Недостатки</label>
          <input
            className="form-review__input"
            id={ReviewFormField.Disadvantage}
            type="text"
            autoComplete="off"
            onChange={handleFieldChange}
            data-testid={'input-disadv'}
          />
          <p
            style={invalidField.some((line) => line === ReviewFormField.Disadvantage) ? positionWaringAbsolute : {...positionWaringAbsolute, ...elementHidden}}
            className={invalidField.some((line) => line === ReviewFormField.Disadvantage) ? 'form-review__warning' : ''}
          >Заполните поле
          </p>
        </div>

        <div style={{...positionRelative, ...blockMargin}}>
          <label className="form-review__label form-review__label--required" htmlFor={ReviewFormField.Comment}>Комментарий</label>
          <textarea
            className="form-review__input form-review__input--textarea"
            id={ReviewFormField.Comment}
            rows={10}
            autoComplete="off"
            onChange={handleFieldChange}
            data-testid={'input-textarea'}
          >
          </textarea>
          <p
            style={invalidField.some((line) => line === ReviewFormField.Comment) ? positionWaringAbsolute : {...positionWaringAbsolute, ...elementHidden}}
            className={invalidField.some((line) => line === ReviewFormField.Comment) ? 'form-review__warning' : ''}
          >Заполните поле
          </p>
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
