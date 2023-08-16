import classNames from 'classnames';

import { ClientData } from '../../../store/clients/types';
import { UserInfoBookCard } from '../user-info-book-card/user-info-book-card';
import { UserInfoEmptyData } from '../user-info-empty-data/user-info-empty-data';

import styles from './user-info-issued.module.scss';

type UserInfoIssuedProps = {
    className?: string;
    client: ClientData;
};

export const UserInfoIssued = ({ className, client }: UserInfoIssuedProps) => (
    <div className={classNames(styles.UserInfoData, className)}>
        <h3 className={styles.header}>Книга на руках</h3>
        {client.delivery.book ? (
            <UserInfoBookCard book={client.delivery.book} className={styles.marginBetweenHeader} />
        ) : (
            <UserInfoEmptyData content='Нет книг на руках' className={styles.marginBetweenHeader} />
        )}
    </div>
);
