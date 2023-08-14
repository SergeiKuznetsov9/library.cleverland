import { FC } from 'react';
import classNames from 'classnames';

import alarm from '../assets/alarm.svg';
import calendar from '../assets/calendar.svg';

import styles from './client-label.module.scss';

export enum ThemeLabel {
    WARNING = 'warning',
    PRIMARY = 'primary',
}

type CLientLabelProps = {
    className?: string;
    date: string;
    theme: ThemeLabel;
};

export const ClientLabel: FC<CLientLabelProps> = ({ className, date, theme }) => {
    const defineMark = () => (theme === ThemeLabel.WARNING ? alarm : calendar);

    return (
        <div className={classNames(styles.UserLabel, className, styles[theme])}>
            <img src={defineMark()} alt='mark' className={styles.mark} />
            <span>{date}</span>
        </div>
    );
};
