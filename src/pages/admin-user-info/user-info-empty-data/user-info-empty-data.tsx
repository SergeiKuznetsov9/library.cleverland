import classNames from 'classnames';

import styles from './user-info-empty-data.module.scss';

type BookedBookCardProps = {
    className?: string;
    content?: string;
};

export const UserInfoEmptyData = ({ className, content }: BookedBookCardProps) => (
    <div className={classNames(styles.UserInfoEmptyData, className)}>{content}</div>
);
