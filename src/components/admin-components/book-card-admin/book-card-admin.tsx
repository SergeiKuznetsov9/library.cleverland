import React, { FC } from 'react';
import classNames from 'classnames';

import IconPlugImg from '../../../assets/img/icon-plug-img.svg';
import { ERROR } from '../../../constants/errors';
import { TOAST } from '../../../constants/toast';
import { Booking, Delivery } from '../../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { issueRequest, returnRequest } from '../../../store/issues';
import { booksFilterStatusSelector } from '../../../store/search/selectors';
import { setToast } from '../../../store/view';
import {
    currentDateString,
    formatDateToDDMMYYYY,
    twoWeeksLaterDateString,
} from '../../../utils/date/date-utils';
import { highlightMatches } from '../../../utils/highlight-matches';
import { Button } from '../../button';

import styles from './book-card-admin.module.scss';

type BookCardAdminProps = {
    className?: string;
    image: { url: string };
    title: string;
    booking: Booking | null;
    delivery: Delivery | null;
    searchValue: string;
    id: number;
};

enum BookStatus {
    BOOKED = 'Забронирована',
    ISSUED = 'Выдана',
    FREE = 'Свободна',
}

export const BookCardAdmin: FC<BookCardAdminProps> = ({
    className,
    image,
    title,
    booking,
    delivery,
    searchValue,
    id,
}) => {
    const dispatch = useAppDispatch();
    const defineStatus = () => {
        if (booking) return BookStatus.BOOKED;
        if (delivery) return BookStatus.ISSUED;

        return BookStatus.FREE;
    };
    const status = defineStatus();
    const { isBooked, isIssued } = useAppSelector(booksFilterStatusSelector);
    const handleHighlight = (string: string) => highlightMatches(searchValue, string);

    const issueBook = () => {
        const payload = {
            data: {
                handed: true,
                book: id,
                recipient: booking?.customerId as number,
                dateHandedFrom: currentDateString(),
                dateHandedTo: twoWeeksLaterDateString(),
                recipientFirstName: booking?.customerFirstName,
                recipientLastName: booking?.customerLastName,
                isBooked,
            },
        };

        if (!booking?.customerId) {
            dispatch(setToast({ type: TOAST.error, text: ERROR.booking }));

            return;
        }

        if (booking?.customerId) {
            dispatch(issueRequest(payload));
        }
    };

    const returnBook = () => {
        dispatch(returnRequest({ isIssued, deliveryId: delivery!.id }));
    };

    return (
        <li className={classNames(styles.card, className)}>
            <div className={styles.imgBlock}>
                <div className={styles.imgContainer}>
                    <img src={image ? image.url : IconPlugImg} alt={title} />
                </div>
            </div>

            <div className={styles.titleBlock}>{handleHighlight(title)}</div>

            <div className={styles.holderBlock}>
                {status === BookStatus.BOOKED && (
                    <span className={styles.holderLabel}>
                        Пользователь:{' '}
                        <span className={styles.holderName}>
                            {booking!.customerFirstName} {booking!.customerLastName}
                        </span>
                    </span>
                )}
                {status === BookStatus.ISSUED && (
                    <span className={styles.holderLabel}>
                        Пользователь:{' '}
                        <span className={styles.holderName}>
                            {delivery!.recipientFirstName} {delivery!.recipientLastName}
                        </span>
                    </span>
                )}
            </div>

            <div className={styles.statusWithButtonsBlock}>
                <div className={styles.status}>
                    {status === BookStatus.ISSUED && (
                        <span className={styles.statusLabel}>
                            Срок:{' '}
                            <span className={styles.statusInfo}>
                                {formatDateToDDMMYYYY(delivery!.dateHandedFrom)}-
                                {formatDateToDDMMYYYY(delivery!.dateHandedTo)}
                            </span>
                        </span>
                    )}

                    {status === BookStatus.BOOKED && (
                        <span className={styles.statusLabel}>
                            Дата:{' '}
                            <span className={styles.statusInfo}>
                                {formatDateToDDMMYYYY(booking!.dateOrder)}
                            </span>
                        </span>
                    )}

                    <span className={styles.statusLabel}>
                        Статус: <span className={styles.statusInfo}>{status}</span>
                    </span>
                </div>

                <div className={styles.buttons}>
                    {status === BookStatus.ISSUED ? (
                        <React.Fragment>
                            {' '}
                            <Button
                                onClick={returnBook}
                                view='secondary'
                                classButton={styles.cardButton}
                            >
                                Отметка о возврате
                            </Button>
                            <Button
                                onClick={() => console.log('Продлить')}
                                view='primary'
                                classButton={styles.cardButton}
                            >
                                Продлить
                            </Button>
                        </React.Fragment>
                    ) : (
                        <Button onClick={issueBook} view='primary' classButton={styles.cardButton}>
                            Выдать
                        </Button>
                    )}
                </div>
            </div>
        </li>
    );
};
