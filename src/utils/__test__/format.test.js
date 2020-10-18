import { zeroPad, formatDate } from '../format';

process.env.TZ = 'UTC';
const ISODateString = '2020-01-18T02:53:34.140Z';

describe('zerpPad()', () => {
  it('should append leading zero to integer less than 10', () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      expect(zeroPad(i)).toEqual(`0${i}`);
    }
  });

  it('should append not leading zero to integer greater than or equal to 10', () => {
    expect(zeroPad(10)).toEqual('10');
    expect(zeroPad(33)).toEqual('33');
    expect(zeroPad(65)).toEqual('65');
  });
});

describe('formatDate()', () => {
  it('should convert ISO date string to "YYYY-MM-DD HH:mm" format', () => {
    expect(formatDate(ISODateString)).toEqual('2020-01-18 02:53');
  });
});
