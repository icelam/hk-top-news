const forceHttps = (url) => {
  const urlRegex = new RegExp('^(http:\\/\\/)(.*)$');
  const urlMatch = url.match(urlRegex);

  return urlMatch !== null
    ? `https://${urlMatch[2]}`
    : url;
};

export default forceHttps;
