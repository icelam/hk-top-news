/**
 * Function used for throttle events listener like onScroll
 * @param {function} func - function needs to be throttled
 * @param {number} limit - throttle for milliseconds
 * @returns {function} throttled function
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function throttledFunction() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

export default throttle;
