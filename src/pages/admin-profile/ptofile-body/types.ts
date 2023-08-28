import { HTMLInputTypeAttribute } from 'react';

export type BodyFormInputs = {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
};

export type TableType = {
    hint?: string;
    type?: HTMLInputTypeAttribute;
    placeholder: string;
    name: string;
    data: string;
    validation?: (value: string) => string | boolean | undefined;
};
