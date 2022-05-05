import { MutableRefObject, useEffect, useRef } from 'react';
import { ModalStatus, DOUBLE_STEP, ONE, KeyBoardNames, EventListenerType } from '../../const';
import { DiveRef, KeyLogType } from '../../types/general.types';

export const useFocusTrap = (
  elementContainer: MutableRefObject<DiveRef>,
  statusOfModal: ModalStatus,
  isHookActive: boolean,
): void => {
  const targetedElements = useRef<Element[]>([]);
  const activeFocus = useRef({currentValue:0, previousValue: 0});

  useEffect(() => {
    if(elementContainer.current !== null) {
      targetedElements.current = Array
        .from(elementContainer.current.querySelectorAll('*'))
        .filter((line) => {
          if(line.nodeName === 'INPUT') {
            return true;
          } else if (line.nodeName === 'BUTTON') {
            return true;
          } else if (line.nodeName === 'TEXTAREA') {
            return true;
          } else {return false;}
        });

      elementContainer.current.focus();
    }
  },[statusOfModal]);

  useEffect(() => {
    const focusNexElement = () => {
      if (activeFocus.current.currentValue < activeFocus.current.previousValue) {
        activeFocus.current.currentValue = activeFocus.current.currentValue + DOUBLE_STEP;
      }

      if(targetedElements.current.length <= activeFocus.current.currentValue) {
        activeFocus.current.currentValue = 0;
        activeFocus.current.previousValue = targetedElements.current.length - ONE;
      }

      (targetedElements.current[activeFocus.current.currentValue] as HTMLElement).focus();
      activeFocus.current.previousValue = activeFocus.current.currentValue;
      activeFocus.current.currentValue = activeFocus.current.currentValue + ONE;
    };

    const focusPreviousElement = () => {
      if (activeFocus.current.currentValue > activeFocus.current.previousValue) {
        activeFocus.current.currentValue = activeFocus.current.currentValue - DOUBLE_STEP;
      }

      if(activeFocus.current.currentValue < 0) {
        activeFocus.current.currentValue = targetedElements.current.length - ONE;
        activeFocus.current.previousValue = 0;
      }

      (targetedElements.current[activeFocus.current.currentValue] as HTMLElement).focus();
      activeFocus.current.previousValue = activeFocus.current.currentValue;
      activeFocus.current.currentValue = activeFocus.current.currentValue - ONE;
    };


    const keyLog = {} as KeyLogType;
    const handleKeyDown = (evt: KeyboardEvent) => {
      const occasion = evt.key;
      if(occasion === KeyBoardNames.Tab || occasion === KeyBoardNames.Shift) {
        evt.preventDefault();
        keyLog[occasion] = true;
      }

      if(keyLog[KeyBoardNames.Shift] && keyLog[KeyBoardNames.Tab]) {
        focusPreviousElement();
      }

      if(!keyLog[KeyBoardNames.Shift] && keyLog[KeyBoardNames.Tab]) {
        focusNexElement();
      }
    };

    const handleKeyUp = (evt: KeyboardEvent) => {
      const occasion = evt.key;
      if(occasion === KeyBoardNames.Tab || occasion === KeyBoardNames.Shift) {
        evt.preventDefault();
        delete keyLog[occasion];
      }
    };

    if(isHookActive) {
      document.addEventListener(EventListenerType.KeyDown, handleKeyDown);
      document.addEventListener(EventListenerType.KeyUp, handleKeyUp);
    } else {
      document.removeEventListener(EventListenerType.KeyDown, handleKeyDown);
      document.removeEventListener(EventListenerType.KeyUp, handleKeyUp);
    }

    return () => {
      document.removeEventListener(EventListenerType.KeyDown, handleKeyDown);
      document.removeEventListener(EventListenerType.KeyUp, handleKeyUp);
    };
  },[statusOfModal]);
};
