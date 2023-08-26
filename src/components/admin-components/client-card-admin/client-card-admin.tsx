import { FC } from 'react';

import { ClientDelivery } from '../../../store/clients/types';
import { formatDateToDDMM, formatDateToDDMMYYYY, isDatePass } from '../../../utils/date/date-utils';
import { Button } from '../../button';

import PlugAvatar from './assets/avatar.png';
import { BooksQuontity } from './books-quontity/books-quontity';
import { ClientLabel, ThemeLabel } from './client-label/client-label';

import styles from './client-card-admin.module.scss';

type ClientCardAdminProps = {
    className?: string;
    id?: number;
    avatar?: any;
    firstName?: string;
    lastName?: string;
    username?: string;
    historyCount?: number;
    createdAt: string;
    phone?: string;
    blocked?: boolean;
    delivery: ClientDelivery;
};

export const ClientCardAdmin: FC<ClientCardAdminProps> = ({
    className,
    id,
    avatar,
    firstName,
    lastName,
    username,
    historyCount = 0,
    createdAt,
    phone,
    blocked,
    delivery,
}) => (
    <li className={styles.UserCard}>
        <div className={styles.imgBlock}>
            <div className={styles.imgContainer}>
                <img src={avatar ? avatar : PlugAvatar} alt='avatar' />
            </div>
        </div>

        <div className={styles.nameBlock}>
            {firstName} {lastName}
        </div>

        <div className={styles.loginBlock}>
            <span className={styles.subtitle}>Логин:</span>
            <span>{username}</span>
        </div>

        <div className={styles.readedBooksBlock}>
            <BooksQuontity quontity={historyCount} />
        </div>

        <div className={styles.userInfoBlock}>
            <span className={styles.userInfoLabel}>
                <span className={styles.subtitle}>Дата регистрации: </span>
                <span className={styles.info}>{formatDateToDDMMYYYY(createdAt)}</span>
            </span>
            <span className={styles.userInfoLabel}>
                <span className={styles.subtitle}>Номер телефона: </span>
                <span className={styles.info}>{phone?.slice(0, 25)}</span>
            </span>
        </div>

        <div className={styles.buttonBlock}>
            {blocked ? (
                <Button
                    onClick={() => console.log('Разблокировать')}
                    view='primary'
                    classButton={`${styles.cardButton} ${styles.blockButton}`}
                >
                    Разблокировать
                </Button>
            ) : (
                <Button
                    onClick={() => console.log('Заблокировать')}
                    view='secondary'
                    classButton={styles.cardButton}
                >
                    Заблокировать
                </Button>
            )}
        </div>

        {delivery.id && (
            <ClientLabel
                className={styles.UserLabel}
                date={formatDateToDDMM(delivery!.dateHandedTo)}
                theme={isDatePass(delivery!.dateHandedTo) ? ThemeLabel.WARNING : ThemeLabel.PRIMARY}
            />
        )}

        {/* eslint-disable-next-line */}
        {blocked && <div className={styles.blockingStyle}></div>}
    </li>
);
