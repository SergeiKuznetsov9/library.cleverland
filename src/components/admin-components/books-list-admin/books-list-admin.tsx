import { useEffect, useState } from 'react';

import { bookListRequest, bookListRequestClean } from '../../../store/books';
import { getBookList } from '../../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { BookCardAdmin } from '../book-card-admin';

import styles from './books-list-admin.module.scss';

export const BooksListAdmin = () => {
    const bookList = useAppSelector(getBookList);
    const dispatch = useAppDispatch();

    const getBooksByPagination = () => {
        dispatch(bookListRequest());
    };

    useEffect((): (() => void) => {
        getBooksByPagination();

        return () => dispatch(bookListRequestClean());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.adminPage}>
            {bookList?.map((book) => (
                <BookCardAdmin
                    key={book.id}
                    className={styles.bookCard}
                    image={book.image}
                    title={book.title}
                    booking={book.booking}
                    delivery={book.delivery}
                />
            ))}
        </section>
    );
};
