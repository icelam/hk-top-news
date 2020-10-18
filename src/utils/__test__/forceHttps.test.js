import forceHttps from '../forceHttps';

const googleUrlInHttp = 'http://google.com';
const googleUrlInHttps = 'https://google.com';

const githubUrl = 'https://github.com/icelam';

const randomString = 'apple';

describe('forceHttps()', () => {
  it('should convert http url to https url', () => {
    expect(forceHttps(googleUrlInHttp)).toEqual(googleUrlInHttps);
  });

  it('should return the original url if it is using https', () => {
    expect(forceHttps(githubUrl)).toEqual(githubUrl);
  });

  it('should return the original string if it not a url', () => {
    expect(forceHttps(randomString)).toEqual(randomString);
  });
});
