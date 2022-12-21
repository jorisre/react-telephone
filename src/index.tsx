import * as React from 'react';
import countries from './countries';
import { Country as CountryType, getMaskDigit } from './utils';
import {
  applyMask,
  getCountryByIso,
  PhoneNumber,
  replaceDialCode,
  splitPhoneNumber,
} from './utils';

const DEFAULT_PHONE_NUMBER = {
  raw: '',
  formatted: '',
  country: countries[0],
};

const PhoneContext = React.createContext<
  [PhoneNumber, (pN: PhoneNumber) => void]
>([
  DEFAULT_PHONE_NUMBER,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

const usePhoneContext = () => React.useContext(PhoneContext);

const DISPLAY_NAME = 'Phone';

export interface PhoneProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  defaultCountry?: CountryType[2];
}

export const _Phone = React.forwardRef<HTMLInputElement, PhoneProps>(
  ({ className, style, children, defaultCountry, value, ...props }, ref) => {
    const _ref = React.useRef<HTMLInputElement | null>(null);
    const _defaultValue = props.defaultValue || value;
    const defaultPhoneNumber =
      (_defaultValue
        ? splitPhoneNumber(_defaultValue)
        : defaultCountry && {
            raw: '',
            formatted: '',
            country: getCountryByIso(defaultCountry),
          }) || DEFAULT_PHONE_NUMBER;

    const [_value, setValue] = React.useState<PhoneNumber>(defaultPhoneNumber);

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

_Phone.displayName = DISPLAY_NAME;

const Country = React.forwardRef<
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
        props.onChange && props.onChange(e);
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

Country.displayName = DISPLAY_NAME + '.Country';

const _Number = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'>
>((props, ref) => {
  const [_value, setValue] = usePhoneContext();

  return (
    <input
      ref={ref}
      {...props}
      placeholder={
        /\d+/.test(props.placeholder || '')
          ? applyMask(props.placeholder, _value.country[4])
          : props.placeholder
      }
      type="tel"
      value={_value.formatted}
      onChange={(e) => {
        props.onChange?.(e);

        setValue(
          Object.assign({}, _value, {
            raw:
              '+' +
              _value.country[3] +
              getMaskDigit(e.target.value, _value.country[4]),
            formatted: applyMask(e.target.value, _value.country[4]),
          })
        );
      }}
    />
  );
});

_Number.displayName = DISPLAY_NAME + '.Number';

export const Phone = Object.assign(_Phone, { Country, Number: _Number });
