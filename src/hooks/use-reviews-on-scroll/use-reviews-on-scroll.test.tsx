import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMockState } from '../../utils/mock-faker';
import React, {FC} from 'react';
import { useReviewsOnScroll } from './use-reviews-on-scroll';


describe('Custom hook: use-reviews-on-scroll', () => {
  it('Calling callback, when scroll down and there some comments, which are not shown up yet', async () => {
    const SCROLL_HEIGHT_FAKE = 500;
    const WINDOW_HEIGHT_FAKE = 200;
    // const SCROLL_TOP_FAKE = 100;
    const FAKE_LIMIT = 9;
    const FAKE_ARRAY_LENGTH = 20;

    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    const fakeCallback = jest.fn();
    jest
      .spyOn(document.documentElement, 'scrollHeight', 'get')
      .mockImplementation(() => SCROLL_HEIGHT_FAKE);

    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => WINDOW_HEIGHT_FAKE);

    // window.scrollY = jest.fn(() => SCROLL_TOP_FAKE) as unknown as number;

    const wrapper: FC<{children: React.ReactNode}> =  ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    renderHook(() => useReviewsOnScroll(FAKE_LIMIT, FAKE_ARRAY_LENGTH, fakeCallback), {wrapper});
    // renderHook(() => useReviewsOnScroll(FAKE_LIMIT, FAKE_ARRAY_LENGTH, fakeCallback));
    // expect(fakeCallback).toHaveBeenCalledTimes(0);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    await waitFor(() => expect(fakeCallback).toHaveBeenCalledTimes(1));
  });
});
