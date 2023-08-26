import classNames from 'classnames';

import styles from './info-field.module.scss';

type InfoFieldProps = {
    className?: string;
    placeHolder?: string;
    data?: string;
};

export const InfoField = ({ className, placeHolder, data }: InfoFieldProps) => (
    <div className={classNames(styles.InfoField, className)}>
        <span className={styles.placeholder}>{placeHolder}</span>
        <span className={styles.data}>{data}</span>
    </div>
);
