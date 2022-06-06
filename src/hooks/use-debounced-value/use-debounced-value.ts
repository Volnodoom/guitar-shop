import { useEffect, useState } from 'react';
import { DELAY_IN_SERVER_REQUEST } from '../../const';

export const useDebouncedValue = (input: string, time = DELAY_IN_SERVER_REQUEST) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debouncedValue;
};
