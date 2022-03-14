import { vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { PhoneInput } from '.';

test('render PhoneInput with defaultValue', () => {
  const phone = '+373333333333';
  render(<PhoneInput defaultValue={phone} />);

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
  render(<PhoneInput value={phone} />);

  expect(screen.queryByDisplayValue(phone)).not.toBeVisible();
  expect(screen.queryByDisplayValue(phone)).toBeInTheDocument();
  expect(screen.queryByDisplayValue('(33) 33-33-33')).toBeVisible();
  expect(screen.queryByDisplayValue('Moldova (+373)')).toBeVisible();
});

test('handle PhoneInput number value change', () => {
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();

  render(<PhoneInput onChange={handleChange} placeholder="3 33 33 33 33" />);

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

  render(<PhoneInput onChange={handleChange} />);

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

  render(<PhoneInput onChange={handleChange} placeholder="3 33 33 33 33" />);

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

test.only('handle PhoneInput number change with defaultValue', () => {
  const phone = '+37322445566';
  const handleChange = vi.fn<[React.ChangeEvent<HTMLInputElement>], void>();
  render(
    <PhoneInput
      onChange={handleChange}
      defaultValue={phone}
      placeholder="toto"
    />
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
  render(<PhoneInput onChange={handleChange} defaultCountry="fr" />);

  expect(screen.queryByDisplayValue('France (+33)')).toBeVisible();

  user.selectOptions(screen.getByDisplayValue('France (+33)'), 'fi');

  expect(screen.queryByDisplayValue('Finland (+358)')).toBeVisible();
});

test('PhoneInput with ref', () => {
  const ref = vi.fn();
  render(<PhoneInput ref={ref} />);

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

test('render PhoneInput with classNames', () => {
  render(
    <PhoneInput
      classNames={{
        container: 'container-class',
        select: 'select-class',
        input: 'input-class',
      }}
    />
  );

  expect(screen.getByRole('group')).toHaveClass('container-class');
  expect(screen.getByRole('combobox')).toHaveClass('select-class');
  expect(screen.getByRole('textbox')).toHaveClass('input-class');
});
