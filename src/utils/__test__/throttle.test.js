import throttle from '../throttle';

const functionToBeThrottled = jest.fn(() => {});

describe('throttle()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should apply throttle to function', () => {
    const throttledFunction = jest.fn(throttle(functionToBeThrottled, 500));

    expect(throttledFunction).toHaveBeenCalledTimes(0);
    expect(functionToBeThrottled).toHaveBeenCalledTimes(0);

    // Trigger throttledFunction for 2 times
    throttledFunction();
    throttledFunction();
    expect(throttledFunction).toHaveBeenCalledTimes(2);
    expect(functionToBeThrottled).toHaveBeenCalledTimes(1);

    // Stimulate time pass
    jest.runOnlyPendingTimers();

    // Trigger throttledFunction for 3 times again
    throttledFunction();
    throttledFunction();
    throttledFunction();
    expect(throttledFunction).toHaveBeenCalledTimes(5);
    expect(functionToBeThrottled).toHaveBeenCalledTimes(2);
  });
});
