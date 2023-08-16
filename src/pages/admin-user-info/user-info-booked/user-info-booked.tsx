import classNames from 'classnames';

import { ClientData } from '../../../store/clients/types';
import { UserInfoBookCard } from '../user-info-book-card/user-info-book-card';
import { UserInfoEmptyData } from '../user-info-empty-data/user-info-empty-data';

import styles from './user-info-booked.module.scss';

type UserInfoBookedProps = {
    className?: string;
    client: ClientData;
};

export const UserInfoBooked = ({ className, client }: UserInfoBookedProps) => (
    <div className={classNames(styles.UserInfoData, className)}>
        <h3 className={styles.header}>Забронированная книга</h3>
        {client.booking.book ? (
            <UserInfoBookCard book={client.booking.book} className={styles.marginBetweenHeader} />
        ) : (
            <UserInfoEmptyData
                content='Нет забронированных книг'
                className={styles.marginBetweenHeader}
            />
        )}
    </div>
);
