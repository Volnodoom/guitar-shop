import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { ModalKind, ModalStatus } from '../../../../const';
import { useEscPress } from '../../../../hooks/use-esc-press/use-esc-press';
import { useFocusTrap } from '../../../../hooks/use-focus-trap/use-focus-trap';
import { DiveRef } from '../../../../types/general.types';
import { ModalReviewSuccess } from '../components';
import ModalReview from '../modal-review/modal-review';

type ModalFrameProps = {
  currentFrameStatus: boolean,
  setModalFrameStatus: Dispatch<SetStateAction<boolean>>,
  modalInfo: ModalKind | null,
  setModalInfo: Dispatch<SetStateAction<ModalKind | null>>,
}

function ModalFrame(props:ModalFrameProps) {
  const {
    currentFrameStatus,
    setModalFrameStatus,
    modalInfo,
    setModalInfo,
  } = props;

  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.Initial);
  const modalRef = useRef<DiveRef>(null);
  const handleFrameClose = () => {
    setModalFrameStatus(false);
    document.body.classList.remove('scroll-lock');
    document.body.classList.remove('scroll-lock-ios');
    setModalStatus(ModalStatus.Initial);
    setModalInfo(ModalKind.Null);
  };

  const handleReviewOpen = () => {
    setModalStatus(ModalStatus.OpenReview);
    document.body.classList.add('scroll-lock');
    document.body.classList.add('scroll-lock-ios');
  };

  useEscPress(currentFrameStatus, handleFrameClose);
  useFocusTrap(modalRef, modalStatus, currentFrameStatus);

  useEffect(() => {
    if(currentFrameStatus && modalInfo === ModalKind.Review) {
      handleReviewOpen();
    }
  },[currentFrameStatus, modalInfo]);


  const handleOverlayClick = (evt: MouseEvent<HTMLElement>) => {
    if(evt.target) {
      handleFrameClose();
    }
  };

  return(
    <div
      className={
        `modal ${currentFrameStatus && 'is-active'} ${
          modalStatus === ModalStatus.OpenReview && 'modal--review'
        } ${
          modalStatus === ModalStatus.Success && 'modal--success'
        }`
      }
      ref={modalRef}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={handleOverlayClick}></div>
        {
          modalStatus === ModalStatus.OpenReview
          &&
          <ModalReview
            onClose={handleFrameClose}
            setStatus={setModalStatus}
          />
        }
        {
          modalStatus === ModalStatus.Success
          &&
          <ModalReviewSuccess onClose={handleFrameClose} />
        }
      </div>
    </div>
  );
}

export default ModalFrame;
