import { toast } from 'react-toastify';

import { ErrorType } from '../types/general.types';
import { BAD_REQUEST, BAD_REQUEST_COUPON, NOT_FOUND, UNDEFINED_ERROR } from '../const';
import request from 'axios';

export const handleError = (error: ErrorType): void => {
  if(!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if(response?.data.messages[0] === BAD_REQUEST_COUPON) {
    toast.info('Введенный купон не существует');
  } else if(response?.status === BAD_REQUEST) {
    toast.info(`${error.response?.status}: ${error.response?.statusText}. Please, try again later.`);
  } else if(response?.status === NOT_FOUND) {
    toast.info(`${error.response?.status}: ${error.response?.statusText}. Please, inter an existing page.`);
  } else {
    toast.error(UNDEFINED_ERROR);
  }
};
