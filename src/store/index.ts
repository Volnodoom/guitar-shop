import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { reducerRoot } from './reducer-root';

export const api = createAPI();
export const store = configureStore({
  reducer: reducerRoot,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});
