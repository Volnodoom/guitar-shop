import { EntityState } from '@reduxjs/toolkit';
import { LoadingStatus } from '../const';
import { store } from '../store';
import { GuitarType, Review } from './general.types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GuitarState extends EntityState<GuitarType> {
  guitarsStatus: LoadingStatus,
  oneGuitarStatus: LoadingStatus,
}

export interface ReviewState extends EntityState<Review> {
  reviewsStatus: LoadingStatus,
  commentStatus: LoadingStatus,
}
