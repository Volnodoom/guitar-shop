import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMockState } from '../../utils/mock-faker';
import Catalog from '../../components/catalog/catalog';
import { useSetCatalogPageState } from './use-set-catalog-page-state';
import React, {FC} from 'react';

// jest.mock('../hook', () => jest.fn());

describe('Custom hook: use-set-catalog-page-state', () => {
  it('return one element (function)', () => {

    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);
    // mockStore.dispatch = jest.fn();

    // const dispatchFunction = jest.fn();
    // const useDispatch = jest.spyOn(Redux, 'useDispatch');
    // useDispatch.mockReturnValue(dispatchFunction);

    // const setItemRangeStart = jest.fn();
    // const setCurrentPage = jest.fn();


    // const wrapper = () => (
    //   <Provider store={mockStore}>
    //     <MemoryRouter>
    //       <Catalog />
    //     </MemoryRouter>
    //   </Provider>
    // );

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    const {result} = renderHook(() => useSetCatalogPageState(), {wrapper});
    const [setPageState] = result.current;

    expect(result.current).toHaveLength(1);
    expect(setPageState).toBeInstanceOf(Function);
  });

  // it('return one element (function)', () => {

  // });
  // it('return one element (function)', () => {

  // });
  // it('return one element (function)', () => {

  // });
});
