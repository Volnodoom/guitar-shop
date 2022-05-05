import { useEffect } from 'react';
import { EventListenerType, KeyBoardCode } from '../../const';

export const useEscPress = (isHookActive: boolean, callback: () => void) => {
  useEffect(() => {
    const handleDocumentKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === KeyBoardCode.Esc.version1 || evt.code === KeyBoardCode.Esc.version2) {
        callback();
      }
    };

    if(isHookActive) {
      document.addEventListener(EventListenerType.KeyDown, handleDocumentKeyDown);
    } else {
      document.removeEventListener(EventListenerType.KeyDown, handleDocumentKeyDown);
    }

    return () => {
      document.removeEventListener(EventListenerType.KeyDown, handleDocumentKeyDown);
    };
  },[callback, isHookActive]);
};

