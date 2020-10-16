/**
 * Check and force non-https resources to use https
 * @param {string} url - image url
 * @returns {string} https image url
 */
const forceHttps = (url) => {
  const urlRegex = new RegExp('^(http:\\/\\/)(.*)$');
  const urlMatch = url.match(urlRegex);

  return urlMatch !== null
    ? `https://${urlMatch[2]}`
    : url;
};

export default forceHttps;
