import { InputHTMLAttributes } from 'react';

export function Switch({
  disabled,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className="relative inline-block min-h-6 min-w-12 cursor-pointer rounded-3xl bg-white duration-500 has-[:checked]:bg-green-600 data-[disabled]:opacity-50"
      data-disabled={disabled}
    >
      <input
        className="peer hidden"
        disabled={disabled}
        type="checkbox"
        {...rest}
      />
      <span className="absolute inset-0 rounded-3xl duration-500 before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-3xl before:bg-black before:duration-500 peer-checked:translate-x-6 before:peer-[:checked]:bg-white" />
    </label>
  );
}
