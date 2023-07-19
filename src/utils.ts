import countries from './countries';

/**
 * Type representing a country object.
 */
export type Country = typeof countries[number];

/**
 * Returns the country object for a given ISO code.
 * @param {string} code - The ISO code of the country.
 * @returns {Country} The country object.
 */
export const getCountryByIso = (code: Country[2]): Country =>
  countries.find((c) => c[2] === code) as Country;

/**
 * Removes all non-digit characters from a string.
 * @param {string} value - The string to remove non-digit characters from.
 * @returns {string} The string with all non-digit characters removed.
 */
export const removeMask = (value: string): string => value.replace(/\D/g, '');

/**
 * Returns the digits of a string that match the mask.
 * @param {string} value - The string to extract digits from.
 * @param {string} mask - The mask to match against.
 * @returns {string} The digits of the string that match the mask.
 */
export const getMaskDigit = (value: string, mask?: string): string => {
  const v = removeMask(value);
  if (!mask) return v;

  const numberOfDigits = mask.match(/\./g)?.length;

  return v.substring(0, numberOfDigits);
};

/**
 * Applies a mask to a string.
 * @param {string} value - The string to apply the mask to.
 * @param {string} mask - The mask to apply.
 * @returns {string} The string with the mask applied.
 */
export const applyMask = (value = '', mask?: string): string => {
  if (!mask || !value) return value;
  const flatValue = removeMask(value).split('');
  return (
    (/^.*\d/.exec(mask.replace(/\./g, () => flatValue.shift() || '')) ||
      [])[0] || ''
  );
};

/**
 * Checks if a phone number is E.164 compliant.
 * @param {string} value - The phone number to check.
 * @returns {boolean} True if the phone number is E.164 compliant, false otherwise.
 */
export const isE164Compliant = (value: string): boolean =>
  /^\+[1-9]\d{1,14}$/.test(value);

/**
 * Type representing a phone number object.
 */
export interface PhoneNumber {
  raw: string;
  formatted: string;
  country: Country;
}

/**
 * Splits a phone number into its raw, formatted, and country components.
 * @param {string} value - The phone number to split.
 * @returns {PhoneNumber | undefined} The phone number object.
 */
export const splitPhoneNumber = (value: string): PhoneNumber | undefined => {
  if (!isE164Compliant(value)) {
    console.log('[react-telephone] phone number should follow E.164');
    return;
  }

  const dial = removeMask(value).substring(0, 6);

  // search by iso2 country code and area
  const [country] = countries.filter(
    (c) =>
      dial.startsWith(c[3]) &&
      (c[6] ? c[6].some((a: string) => dial.startsWith(`${c[3]}${a}`)) : true)
  );

  return {
    raw: value,
    country: country,
    formatted: country ? applyMask(replaceDialCode(value, country[3], ''), country[4]) : value,
  };
};

/**
 * Replaces the dial code in a phone number with a given string.
 * @param {string} value - The phone number to replace the dial code in.
 * @param {string} dialCode - The dial code to replace.
 * @param {string} replacer - The string to replace the dial code with.
 * @returns {string} The phone number with the dial code replaced.
 */
export const replaceDialCode = (
  value: string,
  dialCode: string,
  replacer: string
): string => value.replace('+' + dialCode, replacer);
