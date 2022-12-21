import {
  applyMask,
  getCountryByIso,
  getMaskDigit,
  isE164Compliant,
  removeMask,
  splitPhoneNumber,
} from './utils';

import countries from './countries';
import { vi } from 'vitest';

describe('isE164Compliant', () => {
  const fakeNumber = ('' + Date.now()).substring(0, 11);
  const phoneNumbers = [
    ...countries.map((c) => [c[0], `+${c[3]}${fakeNumber}`, true] as const),
    ['🥸', fakeNumber, false] as const,
    ['🥸', 'fakeNumber', false] as const,
    ['🥸', fakeNumber + '3333', false] as const,
    ['🥸', '++' + fakeNumber, false] as const,
    ['🥸', '33 33 33 33 33', false] as const,
  ];

  test.each(phoneNumbers)('isE164Compliant(%s, %s) -> %d', (_, p, e) =>
    expect(isE164Compliant(p)).toBe(e)
  );
});

describe('splitPhoneNumber', () => {
  test.each([
    [
      '+33622443355',
      {
        raw: '+33622443355',
        formatted: '6 22 44 33 55',
        country: [
          'France',
          ['europe', 'eu-union'],
          'fr',
          '33',
          '. .. .. .. ..',
        ],
      },
    ],
    [
      '+15143818804',
      {
        raw: '+15143818804',
        formatted: '(514) 381-8804',
        country: [
          'Canada',
          ['america', 'north-america'],
          'ca',
          '1',
          '(...) ...-....',
          1,
          [
            '204',
            '226',
            '236',
            '249',
            '250',
            '289',
            '306',
            '343',
            '365',
            '387',
            '403',
            '416',
            '418',
            '431',
            '437',
            '438',
            '450',
            '506',
            '514',
            '519',
            '548',
            '579',
            '581',
            '587',
            '604',
            '613',
            '639',
            '647',
            '672',
            '705',
            '709',
            '742',
            '778',
            '780',
            '782',
            '807',
            '819',
            '825',
            '867',
            '873',
            '902',
            '905',
          ],
        ],
      },
    ],
  ])('unpackRawPhone(%s)', (p, e) => expect(splitPhoneNumber(p)).toEqual(e));

  test('should return undefined and log an error', () => {
    const log = vi.spyOn(console, 'log');

    expect(splitPhoneNumber('fake')).toBeUndefined();
    expect(log).toHaveBeenCalledTimes(1);
    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(
      '"[react-telephone] phone number should follow E.164"'
    );
  });
});

test.each([
  ['+33234567890', '33234567890'],
  ['(33) 33-33-33', '33333333'],
])('removeMask(%s) -> %s', (p, e) => expect(removeMask(p)).toBe(e));

test.each([
  ['234567890', '. .. .. .. ..', '234567890'],
  ['23456789099', '. .. .. .. ..', '234567890'],
  ['2345678', '. .. .. .. ..', '2345678'],
  ['(33) 33-33-33', '(..) ..-..-..', '33333333'],
])('getMaskDigit(%s, %s) -> %s', (p, m, e) =>
  expect(getMaskDigit(p, m)).toBe(e)
);

test('getCountryByIso', () => {
  expect(getCountryByIso('fr')).toEqual([
    'France',
    ['europe', 'eu-union'],
    'fr',
    '33',
    '. .. .. .. ..',
  ]);
});

test.each([
  ['', undefined, ''],
  ['1234', '.. ..', '12 34'],
  ['12 34', '.. ..', '12 34'],
  ['123456', '.. ...', '12 345'], // Ignore excess digits
  ['123456', '.... ....', '1234 56'], // Fill as much as possible
  ['123456', '.... ..-..', '1234 56'], // Stop at first missing digit
  ['123456', '.... ....-..', '1234 56'], // Stop at first missing digit
  ['6 12 34 56 78', '. .. .. .. ..', '6 12 34 56 78'],
  ['+33234567890', undefined, '+33234567890'],
])('applyMask(%s, %s) -> %s', (p, m, e) => {
  expect(applyMask(p, m)).toBe(e);
});
