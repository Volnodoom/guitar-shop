import { toast } from 'react-toastify';

import { ErrorType } from '../types/general.types';
import { BAD_REQUEST, UNDEFINED_ERROR } from '../const';

export const handleError = (error: ErrorType): void => {

  if((error as Response).status === BAD_REQUEST) {
    toast.info(`${(error as Response).status}: ${(error as Response).statusText}. Please, try again later.`);
  } else {
    toast.error(UNDEFINED_ERROR);
  }
};
