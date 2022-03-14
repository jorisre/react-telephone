import {
  applyMask,
  getCountryByIso,
  isE164Compliant,
  removeMask,
  splitPhoneNumber,
} from './utils';

import countries from './countries';

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
});

test.each([
  ['+33624157863', '33624157863'],
  ['(33) 33-33-33', '33333333'],
])('removeMask(%s) -> %s', (p, e) => expect(removeMask(p)).toBe(e));

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
  ['6 24 15 78 63', '. .. .. .. ..', '6 24 15 78 63'],
  ['+33624157863', undefined, '+33624157863'],
])('applyMask(%s, %s) -> %s', (p, m, e) => {
  expect(applyMask(p, m)).toBe(e);
});
