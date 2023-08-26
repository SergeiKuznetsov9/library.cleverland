import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

type ButtonProps = {
    isDisabled?: boolean;
    classButton?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
    view?: 'primary' | 'secondary' | 'ghost' | 'filter';
    type?: JSX.IntrinsicElements['button']['type'];
    dataTestId?: string;
};

export const Button = ({
    isDisabled = false,
    classButton,
    onClick,
    children,
    view = 'ghost',
    type = 'button',
    dataTestId,
}: ButtonProps) => (
    <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={classNames(styles[view], classButton, isDisabled && styles.disabled)}
        onClick={onClick}
        disabled={isDisabled}
        data-test-id={dataTestId}
    >
        {children}
    </button>
);
