import { useEffect } from 'react';
import { EventListenerType } from '../../const';
import { isEscape } from '../../utils/utils-components';

export const useEscPress = (isHookActive: boolean, callback: () => void) => {
  useEffect(() => {
    const handleDocumentKeyDown = (evt: KeyboardEvent) => {
      if (isEscape(evt.code)) {
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

