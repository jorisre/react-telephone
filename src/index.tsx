import { createContext, forwardRef, useContext, useRef, useState } from 'react';
import countries from './countries';
import type { Country as CountryType } from './utils';
import {
  applyMask,
  getCountryByIso,
  PhoneNumber,
  removeMask,
  replaceDialCode,
  splitPhoneNumber,
} from './utils';

const DEFAULT_PHONE_NUMBER = {
  raw: '',
  formatted: '',
  country: countries[0],
};

const PhoneContext = createContext<[PhoneNumber, (pN: PhoneNumber) => void]>([
  DEFAULT_PHONE_NUMBER,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

const usePhoneContext = () => useContext(PhoneContext);

export interface PhoneProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  defaultCountry?: CountryType[2];
}

export const _Phone = forwardRef<HTMLInputElement, PhoneProps>(
  ({ className, style, children, defaultCountry, value, ...props }, ref) => {
    const _ref = useRef<HTMLInputElement | null>(null);
    const _defaultValue = props.defaultValue || value;
    const defaultPhoneNumber =
      (_defaultValue
        ? splitPhoneNumber(_defaultValue)
        : defaultCountry && {
            raw: '',
            formatted: '',
            country: getCountryByIso(defaultCountry),
          }) || DEFAULT_PHONE_NUMBER;

    const [_value, setValue] = useState<PhoneNumber>(defaultPhoneNumber);

    const handleChange = (phoneNumber: PhoneNumber) => {
      setValue(phoneNumber);

      if (_ref.current != null) {
        // @ts-expect-error Gets the own property descriptor of the specified object.
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ).set.call(_ref.current, phoneNumber.raw);

        _ref.current.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    return (
      <PhoneContext.Provider value={[_value, handleChange]}>
        <span className={className} style={style}>
          <input
            aria-hidden="true"
            type="tel"
            style={{ display: 'none' }}
            {...props}
            ref={(r) => {
              if (typeof ref === 'function') ref(r);
              _ref.current = r;
            }}
            defaultValue={defaultPhoneNumber.raw}
          />
          {children}
        </span>
      </PhoneContext.Provider>
    );
  }
);

_Phone.displayName = 'Phone';

const Country = forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithRef<'select'>
>((props, ref) => {
  const [_value, setValue] = usePhoneContext();

  return (
    <select
      ref={ref}
      {...props}
      value={_value.country[2]}
      onChange={(e) => {
        props.onChange?.(e);
        const country = getCountryByIso(e.target.value as CountryType[2]);

        const raw = _value.raw
          ? replaceDialCode(_value.raw, _value.country[3], '+' + country[3])
          : '+' + country[3];

        setValue({
          formatted: applyMask(_value.formatted, country[4]),
          raw,
          country,
        });
      }}
    >
      {countries.map((country) => (
        <option value={country[2]} key={country[2]}>
          {country[0]}&nbsp;(+{country[3]})
        </option>
      ))}
    </select>
  );
});

Country.displayName = _Phone.displayName + '.Country';

const _Number = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'>
>((props, ref) => {
  const [_value, setValue] = usePhoneContext();

  return (
    <input
      ref={ref}
      {...props}
      type="tel"
      value={_value.formatted}
      onChange={(e) => {
        props.onChange?.(e);

        if (/\d+|^$/.test(e.target.value)) {
          setValue(
            Object.assign({}, _value, {
              raw: '+' + _value.country[3] + removeMask(e.target.value),
              formatted: applyMask(e.target.value, _value.country[4]),
            })
          );
        }
      }}
    />
  );
});

_Number.displayName = _Phone.displayName + '.Number';

export const Phone = Object.assign(_Phone, { Country, Number: _Number });
