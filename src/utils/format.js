/**
 * Add leading zero for integer value less than 10
 * @param {number} n - number that needs to be zero paddeed
 * @returns {string} zero padded string
 */
export const zeroPad = (n) => (n < 10 ? `0${n}` : `${n}`);

/**
 * Format ISO date string to human readable format
 * @param {string} date - ISO date string
 * @returns {string} formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${zeroPad(d.getMonth() + 1)}-${zeroPad(d.getDate())} ${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}`;
};
