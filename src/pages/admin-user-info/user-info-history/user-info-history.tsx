import classNames from 'classnames';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ClientData } from '../../../store/clients/types';
import { CardView, UserInfoBookCard } from '../user-info-book-card/user-info-book-card';
import { UserInfoEmptyData } from '../user-info-empty-data/user-info-empty-data';

import styles from './user-info-history.module.scss';

type UserInfoHistoryProps = {
    className?: string;
    client: ClientData;
};

export const UserInfoHistory = ({ className, client }: UserInfoHistoryProps) => {
    const { books } = client.history;

    SwiperCore.use([Pagination]);

    return (
        <div className={classNames(styles.UserInfoData, className)}>
            <h3 className={styles.header}>История прочитанных книг</h3>

            {books ? (
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={30}
                    slidesPerView='auto'
                    className={styles.swiper}
                    pagination={{ clickable: true }}
                >
                    {books.map((book) => (
                        <SwiperSlide key={book.id} className={styles.slide}>
                            <UserInfoBookCard
                                book={book}
                                className={styles.marginBetweenHeader}
                                cardView={CardView.CARD}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <UserInfoEmptyData
                    content='Еще нет истории книг'
                    className={styles.marginBetweenHeader}
                />
            )}
        </div>
    );
};
