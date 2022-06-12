import { renderHook } from '@testing-library/react-hooks';
import { useDebouncedValue } from './use-debounced-value';

describe('Custom hook: use-debounced-value', () => {
  it('Return inputted value after delay', () => {
    const FAKE_VALUE = 'fake';
    const FAKE_TIME = 1000;
    const HALF_FAKE_TIME = 500;

    jest.useFakeTimers();
    const {result} = renderHook(() => useDebouncedValue(FAKE_VALUE, FAKE_TIME));
    let returnValue = result.current;

    expect(returnValue).toBe('');

    jest.advanceTimersByTime(HALF_FAKE_TIME);
    returnValue = result.current;
    expect(returnValue).toBe('');

    jest.advanceTimersByTime(FAKE_TIME);
    returnValue = result.current;

    expect(returnValue).toBe(FAKE_VALUE);
  });

  it('Return inputted value with delay after latest change of input', () => {
    const FAKE_VALUE_INITIAL = 'fake';
    const NEW_FAKE = 'fake2';
    const FAKE_TIME = 1000;
    const HALF_FAKE_TIME = 500;

    jest.useFakeTimers();
    let input = FAKE_VALUE_INITIAL;
    let time = FAKE_TIME;
    const {result, rerender} = renderHook(() => useDebouncedValue(input, time));
    const returnValueInitial = result.current;

    expect(returnValueInitial).toBe('');

    jest.advanceTimersByTime(HALF_FAKE_TIME);
    input = NEW_FAKE;
    time = FAKE_TIME;
    rerender();
    const returnValue500sec = result.current;

    expect(returnValue500sec).toBe('');

    jest.advanceTimersByTime(FAKE_TIME);
    const returnValue1000sec = result.current;

    expect(returnValue1000sec).toBe('');

    jest.advanceTimersByTime(FAKE_TIME + HALF_FAKE_TIME);
    const returnValue1500sec = result.current;

    expect(returnValue1500sec).toBe('fake2');
  });
});

