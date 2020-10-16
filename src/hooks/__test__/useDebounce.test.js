import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce()', () => {
  it('shoud debounce state', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 0, delay: 500 }
    });

    act(() => {
      rerender({ value: 10 });
    });
    expect(result.current).toEqual(0);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toEqual(10);
  });
});
