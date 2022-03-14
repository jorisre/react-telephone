import { forwardRef, useRef, useState } from 'react';
import countries from './countries';
import {
	applyMask,
	Country,
	getCountryByIso,
	PhoneNumber,
	removeMask,
	replaceDialCode,
	splitPhoneNumber,
} from './utils';

interface Props
  extends Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  defaultCountry?: Country[2];
  classNames?: {
    container?: string;
    select?: string;
    input?: string;
  };
}

export const PhoneInput = forwardRef<HTMLInputElement, Props>(
	({ value, defaultCountry, classNames, ...props }, ref) => {
		const _ref = useRef<HTMLInputElement | null>(null);
		const _defaultValue = props.defaultValue || value;
		const defaultPhoneNumber = _defaultValue
			? splitPhoneNumber(_defaultValue)
			: {
				raw: '',
				formatted: '',
				country: defaultCountry
					? getCountryByIso(defaultCountry)
					: countries[0],
			};

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
			<span className={classNames && classNames.container} role="group">
				<select
					className={classNames && classNames.select}
					value={_value.country[2]}
					onChange={(e) => {
						const country = getCountryByIso(e.target.value as Country[2]);

						const raw = _value.raw
							? replaceDialCode(_value.raw, _value.country[3], '+' + country[3])
							: '+' + country[3];

						handleChange({
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

				<input
					onChange={props.onChange}
					aria-hidden="true"
					type="tel"
					style={{ display: 'none' }}
					ref={(r) => {
						if (typeof ref === 'function') ref(r);
						_ref.current = r;
					}}
					defaultValue={defaultPhoneNumber.raw}
				/>

				<input
					{...props}
					className={[props.className, classNames && classNames.input]
						.filter(Boolean)
						.join(' ')}
					type="tel"
					value={_value.formatted}
					onChange={(e) => {
						if (/\d+/.test(e.target.value)) {
							handleChange(
								Object.assign({}, _value, {
									raw: '+' + _value.country[3] + removeMask(e.target.value),
									formatted: applyMask(e.target.value, _value.country[4]),
								})
							);
						}
					}}
				/>
			</span>
		);
	}
);

PhoneInput.displayName = 'PhoneInput';
