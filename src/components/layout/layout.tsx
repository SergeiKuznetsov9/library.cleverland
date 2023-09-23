import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import {
    bookingSelector,
    booksSelector,
    getIsLoadingBooksRequests,
    getLoadingBooksList,
} from '../../store/books/selectors';
import {
    getClientIsBlocking,
    getClientIsUnblocking,
    getClientsListIsLoading,
} from '../../store/clients/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authenticatedUserRequest } from '../../store/user';
import { getUserSelector } from '../../store/user/selectors';
import { getToasts } from '../../store/view/selectors';
import { BookingCalendar } from '../booking-calendar';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader/loader';
import { ModalRateBook } from '../modal-rate-book';
import { Toast } from '../toast';

import styles from './layout.module.scss';

export const Layout = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { data: user } = useAppSelector(getUserSelector);
    const {
        bookReview: { isOpenReviewModal },
    } = useAppSelector(booksSelector);

    useEffect(() => {
        dispatch(authenticatedUserRequest());
    }, [dispatch]);

    const isLoadingBooksRequests = useSelector(getIsLoadingBooksRequests);
    const isLoadingBooksList = useSelector(getLoadingBooksList);
    const isLoadingClientsList = useSelector(getClientsListIsLoading);
    const isBlocking = useSelector(getClientIsBlocking);
    const isUnblocking = useSelector(getClientIsUnblocking);
    const { isLoading: isLoadingBooking } = useSelector(bookingSelector);
    const toasts = useSelector(getToasts);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className={styles.layout} data-test-id='app'>
            <Header
                avatar={user?.avatar}
                path={pathname.slice(1)}
                userFirstName={user?.firstName}
            />
            <Outlet />
            <Footer />
            {(isLoadingBooksRequests ||
                isLoadingBooksList ||
                isLoadingClientsList ||
                isLoadingBooking ||
                isBlocking ||
                isUnblocking) && <Loader />}
            {toasts.length > 0 && (
                <div className={styles.toastsWrapper}>
                    {toasts.map(({ text, type }) => (
                        <Toast key={Math.random()} text={text} type={type} />
                    ))}
                </div>
            )}
            <BookingCalendar />
            {isOpenReviewModal && <ModalRateBook />}
        </div>
    );
};
