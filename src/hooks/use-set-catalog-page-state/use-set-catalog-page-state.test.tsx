import { renderHook, act } from '@testing-library/react-hooks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMockState } from '../../utils/mock-faker';
import { useSetCatalogPageState } from './use-set-catalog-page-state';
import React, {FC} from 'react';


describe('Custom hook: use-set-catalog-page-state', () => {
  it('Return one element (function)', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);


    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    const {result} = renderHook(() => useSetCatalogPageState(), {wrapper});
    const [setPageState] = result.current;

    expect(result.current).toHaveLength(1);
    expect(setPageState).toBeInstanceOf(Function);
  });

  it('Parameter, which have been passed to return function lead to call actions: setItemRangeStart and setCurrentPage', () => {
    const FAKE_NUMBER = 3;

    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    const {result} = renderHook(() => useSetCatalogPageState(), {wrapper});
    const [setPageState] = result.current;
    act(() => setPageState(FAKE_NUMBER));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it('Passing parameter with value equal to null to return function does not lead to call any dispatch actions', () => {
    const FAKE_VALUE = null;

    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    mockStore.dispatch = jest.fn();

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    const {result} = renderHook(() => useSetCatalogPageState(), {wrapper});
    const [setPageState] = result.current;
    act(() => setPageState(FAKE_VALUE));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });
});
