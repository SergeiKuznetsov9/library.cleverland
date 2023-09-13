import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import { Control, Validate } from 'react-hook-form';

export type CustomInputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    placeholder?: string;
    error?: string | boolean;
    clearActionErrors?: () => void;
    required?: boolean;
    hint?: string;
    validate?: Validate<string> | Record<string, Validate<unknown>>;
    defaultValue?: string;
    notAuthFilled?: boolean;
    isDisabled?: boolean;
    dataTestId?: string;
    customHint?: ReactNode;
    control?: Control<any>;
    setError?: any;
};
