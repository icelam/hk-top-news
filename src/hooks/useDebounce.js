import { useState, useEffect } from 'react';

/**
 * A hook which used for debounce states for a certain amount of time(ms)
 * @param {*} value - state value
 * @param {number} delay - debounce in milliseconds
 * @returns {*} latest value of state
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
};

export default useDebounce;
