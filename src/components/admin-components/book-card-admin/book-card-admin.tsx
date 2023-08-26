import React, { FC, forwardRef,Ref } from 'react';
import classNames from 'classnames';

import IconPlugImg from '../../../assets/img/icon-plug-img.svg';
import { Booking, Delivery } from '../../../store/books/types';
import { formatDateToDDMMYYYY } from '../../../utils/date/date-utils';
import { Button } from '../../button';

import styles from './book-card-admin.module.scss';

type BookCardAdminProps = {
    className?: string;
    image: { url: string };
    title?: string;
    booking: Booking | null;
    delivery: Delivery | null;
};

type BookCardAdminRef = HTMLLIElement;

enum BookStatus {
    BOOKED = 'Забронирована',
    ISSUED = 'Выдана',
    FREE = 'Свободна',
}

export const BookCardAdmin: FC<BookCardAdminProps & { ref?: Ref<BookCardAdminRef> }> = forwardRef(
    ({ className, image, title, booking, delivery }, ref: Ref<HTMLLIElement>) => {
        const defineStatus = () => {
            if (booking) return BookStatus.BOOKED;
            if (delivery) return BookStatus.ISSUED;

            return BookStatus.FREE;
        };
        const status = defineStatus();

        return (
            <li className={classNames(styles.card, className)} ref={ref as any}>
                <div className={styles.imgBlock}>
                    <div className={styles.imgContainer}>
                        <img src={image ? image.url : IconPlugImg} alt={title} />
                    </div>
                </div>

                <div className={styles.titleBlock}>{title}</div>

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
                                    onClick={() => console.log('Отметка о возврате')}
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
                            <Button
                                onClick={() => console.log('Выдать')}
                                view='primary'
                                classButton={styles.cardButton}
                            >
                                Выдать
                            </Button>
                        )}
                    </div>
                </div>
            </li>
        );
    },
);
