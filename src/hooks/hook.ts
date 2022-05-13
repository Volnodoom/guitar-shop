import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/state.types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
