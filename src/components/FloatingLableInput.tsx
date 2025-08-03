'use client';

import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type Props = {
  label: string;
  example: string;
  icon: string | StaticImport;
  register: UseFormRegisterReturn;
  isTextArea?: boolean;
  valueInit?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'>;

export default function FloatingLabelInput({
  label,
  example,
  icon,
  register,
  isTextArea = false,
  valueInit = '',
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(valueInit);

  const shared = {
    ...register,
    onFocus: () => setFocused(true),
    onBlur: (e: any) => {
      setFocused(false);
      register.onBlur?.(e);
    },
    onChange: (e: any) => {
      setValue(e.target.value);
      register.onChange?.(e);
    },
  };

  return (
    <div className="relative mt-6">
      <label
        className={clsx(
          'absolute text-sm font-bold transition-all duration-200 pointer-events-none px-1',
          {
            'top-[-20px] left-6 text-xs text-green-700': focused || value,
            'top-0 left-10 text-black text-sm': !(focused || value),
          }
        )}
      >
        {label}
      </label>

      <div className="pt-5 flex items-center justify-center border rounded-xl shadow px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-green-500">
        <Image src={icon} alt="icon" width={24} height={24} className="mr-2" />
        {isTextArea ? (
          <textarea
            {...(shared as any)}
            {...props}
            placeholder={example}
            rows={3}
            className="w-full bg-transparent outline-none resize-none"
          />
        ) : (
          <input
            {...(shared as any)}
            placeholder={example}
            {...props}
            value={value}
            className="w-full bg-transparent outline-none"
          />
        )}
      </div>

    </div>
  );
}
