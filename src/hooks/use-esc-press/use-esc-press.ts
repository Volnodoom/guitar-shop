import { useEffect } from 'react';
import { KeyBoardCode } from '../../const';

export const useEscPress = (isHookActive: boolean, callback: () => void) => {
  useEffect(() => {
    const handleDocumentKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === KeyBoardCode.Esc.version1 || evt.code === KeyBoardCode.Esc.version2) {
        callback();
      }
    };

    if(isHookActive) {
      document.addEventListener('keydown', handleDocumentKeyDown);
    } else {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  },[callback, isHookActive]);
};

