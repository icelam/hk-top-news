export const zeroPad = n => (n < 10 ? `0${n}` : `${n}`);

export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${zeroPad(d.getMonth() + 1)}-${zeroPad(d.getDate())} ${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}`;
};
