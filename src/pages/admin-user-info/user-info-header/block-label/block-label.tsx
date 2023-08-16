import classNames from 'classnames';

import alarm from '../assets/alarm.png';

import styles from './block-label.module.scss';

type BlockLabelProps = {
    className?: string;
};

export const BlockLabel = ({ className }: BlockLabelProps) => (
    <div className={classNames(styles.BlockLabel, className)}>
        <img className={styles.image} src={alarm} alt='alarm' />
    </div>
);
