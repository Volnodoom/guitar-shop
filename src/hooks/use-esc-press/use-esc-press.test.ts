import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useEscPress } from './use-esc-press';


describe('Custom hook: use-esc-press', () => {
  it('Pressing Esc when custom hook is active it initiate a callback', async () => {
    const fakeCallback = jest.fn();

    renderHook(() => useEscPress(true, fakeCallback));
    userEvent.keyboard('{Escape}');

    await waitFor(() => expect(fakeCallback).toHaveBeenCalledTimes(1));
  });

  it('Pressing Esc when custom hook is NOT active do nothing', async () => {
    const fakeCallback = jest.fn();

    renderHook(() => useEscPress(false, fakeCallback));
    userEvent.keyboard('{Escape}');

    await waitFor(() => expect(fakeCallback).toHaveBeenCalledTimes(0));
  });
});
