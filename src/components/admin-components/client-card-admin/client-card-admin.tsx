import { FC, SyntheticEvent } from 'react';

import { clientBlock, clientUnblock } from '../../../store/clients';
import { ClientDelivery } from '../../../store/clients/types';
import { useAppDispatch } from '../../../store/hooks';
import { formatDateToDDMM, formatDateToDDMMYYYY, isDatePass } from '../../../utils/date/date-utils';
import { highlightMatches } from '../../../utils/highlight-matches';
import { Button } from '../../button';

import PlugAvatar from './assets/avatar.png';
import { BooksQuontity } from './books-quontity/books-quontity';
import { ClientLabel, ThemeLabel } from './client-label/client-label';

import styles from './client-card-admin.module.scss';

type ClientCardAdminProps = {
    className?: string;
    id?: number;
    avatar?: any;
    firstName: string;
    lastName: string;
    username: string;
    historyCount?: number;
    createdAt: string;
    phone?: string;
    blocked?: boolean;
    searchValue: string;
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
    searchValue,
}) => {
    const dispatch = useAppDispatch();

    const toggleBlockingClient = (event: SyntheticEvent<EventTarget>, id: number) => {
        event.preventDefault();
        dispatch(blocked ? clientUnblock(id) : clientBlock(id));
    };

    const handleHighlight = (string: string) => highlightMatches(searchValue, string);

    return (
        <li className={styles.UserCard}>
            <div className={styles.imgBlock}>
                <div className={styles.imgContainer}>
                    <img src={avatar ? avatar : PlugAvatar} alt='avatar' />
                </div>
            </div>

            <div className={styles.nameBlock}>
                {handleHighlight(firstName)} {handleHighlight(lastName)}
            </div>

            <div className={styles.loginBlock}>
                <span className={styles.subtitle}>Логин:</span>
                <span>{handleHighlight(username)}</span>
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
                    <span className={styles.info}>
                        {phone ? handleHighlight(phone.slice(0, 25)) : ''}
                    </span>
                </span>
            </div>

            <div className={styles.buttonBlock}>
                {blocked ? (
                    <Button
                        onClick={(event) => toggleBlockingClient(event, id as number)}
                        view='primary'
                        classButton={`${styles.cardButton} ${styles.blockButton}`}
                    >
                        Разблокировать
                    </Button>
                ) : (
                    <Button
                        onClick={(event) => toggleBlockingClient(event, id as number)}
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
                    theme={
                        isDatePass(delivery!.dateHandedTo) ? ThemeLabel.WARNING : ThemeLabel.PRIMARY
                    }
                />
            )}

            {/* eslint-disable-next-line */}
            {blocked && <div className={styles.blockingStyle}></div>}
        </li>
    );
};
