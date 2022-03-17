import { vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Phone } from '.';

test('render PhoneInput with defaultValue', () => {
  const phone = '+373333333333';
  render(
    <Phone defaultValue={phone}>
      <Phone.Country />
      <Phone.Number />
    </Phone>
  );

  expect(screen.queryByDisplayValue(phone)).not.toBeVisible();
  expect(screen.queryByDisplayValue(phone)).toBeInTheDocument();
  expect(screen.queryByDisplayValue(phone)).toHaveAttribute('type', 'tel');
  expect(screen.queryByDisplayValue(phone)).toHaveAttribute(
    'aria-hidden',
    'true'
  );
  expect(screen.queryByDisplayValue('(33) 33-33-33')).toBeVisible();
  expect(screen.queryByDisplayValue('(33) 33-33-33')).toHaveAttribute(
    'type',
    'tel'
  );
  expect(screen.queryByDisplayValue('Moldova (+373)')).toBeVisible();
});

test('render PhoneInput with value', () => {
  const phone = '+373333333333';
  render(
    <Phone value={phone}>
      <Phone.Country />
      <Phone.Number />
    </Phone>
  );

  expect(screen.queryByDisplayValue(phone)).not.toBeVisible();
  expect(screen.queryByDisplayValue(phone)).toBeInTheDocument();
  expect(screen.queryByDisplayValue('(33) 33-33-33')).toBeVisible();
  expect(screen.queryByDisplayValue('Moldova (+373)')).toBeVisible();
});

test('handle PhoneInput number value change', () => {
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();

  render(
    <Phone onChange={handleChange}>
      <Phone.Country />
      <Phone.Number placeholder="3 33 33 33 33" />
    </Phone>
  );

  expect(handleChange).not.toHaveBeenCalled();

  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '334455667');

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: '+93334455667' }),
    })
  );
});

test('handle PhoneInput country value change', () => {
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();

  render(
    <Phone onChange={handleChange}>
      <Phone.Country />
      <Phone.Number />
    </Phone>
  );

  expect(handleChange).not.toHaveBeenCalled();

  user.selectOptions(screen.getByDisplayValue('Afghanistan (+93)'), 'fr');

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: '+33' }),
    })
  );
});

test('handle PhoneInput country and value change', () => {
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();

  render(
    <Phone onChange={handleChange}>
      <Phone.Country />
      <Phone.Number placeholder="3 33 33 33 33" />
    </Phone>
  );

  expect(handleChange).not.toHaveBeenCalled();

  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '634455667');

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: '+93634455667' }),
    })
  );

  user.selectOptions(screen.getByDisplayValue('Afghanistan (+93)'), 'fr');

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: '+33634455667' }),
    })
  );
});

test('handle PhoneInput number change with defaultValue', () => {
  const phone = '+37322445566';
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();
  render(
    <Phone onChange={handleChange} defaultValue={phone}>
      <Phone.Country />
      <Phone.Number placeholder="3 33 33 33 33" />
    </Phone>
  );

  expect(handleChange).not.toHaveBeenCalled();
  expect(screen.queryByDisplayValue(phone)).not.toBeVisible();
  expect(screen.queryByDisplayValue(phone)).toBeInTheDocument();
  expect(screen.queryByDisplayValue('(22) 44-55-66')).toBeVisible();
  expect(screen.queryByDisplayValue('Moldova (+373)')).toBeVisible();

  user.selectOptions(screen.getByDisplayValue('Moldova (+373)'), 'fr');

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: '+3322445566' }),
    })
  );

  expect(screen.queryByDisplayValue('2 24 45 56 6')).toBeVisible();
  expect(screen.queryByDisplayValue('France (+33)')).toBeVisible();
});

test('PhoneInput with default country and change it', () => {
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();

  render(
    <Phone onChange={handleChange} defaultCountry="fr">
      <Phone.Country />
      <Phone.Number />
    </Phone>
  );

  expect(screen.queryByDisplayValue('France (+33)')).toBeVisible();

  user.selectOptions(screen.getByDisplayValue('France (+33)'), 'fi');

  expect(screen.queryByDisplayValue('Finland (+358)')).toBeVisible();
});

test('PhoneInput with ref', () => {
  const ref = vi.fn();
  render(
    <Phone ref={ref}>
      <Phone.Country />
      <Phone.Number />
    </Phone>
  );

  expect(ref).toHaveBeenCalled();
  expect(ref.mock.calls).toMatchInlineSnapshot(`
    [
      [
        <input
          aria-hidden="true"
          style="display: none;"
          type="tel"
          value=""
        />,
      ],
    ]
  `);
});

test('should empty the field', async () => {
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();

  render(
    <Phone onChange={handleChange} defaultCountry="fr">
      <Phone.Country />
      <Phone.Number placeholder="3 33 33 33 33" />
    </Phone>
  );

  expect(handleChange).not.toHaveBeenCalled();

  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '334455667');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');

  expect(screen.getByPlaceholderText('3 33 33 33 33')).toHaveValue('3 34 45 5');

  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');

  expect(screen.getByPlaceholderText('3 33 33 33 33')).toHaveValue('3 34 4');

  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');
  user.type(screen.getByPlaceholderText('3 33 33 33 33'), '{Backspace}');

  expect(screen.getByPlaceholderText('3 33 33 33 33')).toBeEmptyDOMElement();
});
