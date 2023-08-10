import { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    classNameForContainer?: string;
    classNameForLabel?: string;
    classNameForInput?: string;
    label?: string;
    onToggle: () => void;
    status: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
    classNameForContainer,
    classNameForLabel,
    classNameForInput,
    label = '',
    onToggle,
    status,
    ...otherProps
}) => (
    <label className={classNames(styles.CheckBoxContainer, classNameForLabel)}>
        <input
            type='checkbox'
            className={styles.CheckBoxInput}
            checked={status}
            onChange={onToggle}
            {...otherProps}
        />
        <span className={classNames(styles.CheckBoxLabel, classNameForLabel)}>{label}</span>
    </label>
);
