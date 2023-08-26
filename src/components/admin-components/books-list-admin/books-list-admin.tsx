import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll';
import {
    bookListRequestAllDownloaded,
    bookListRequestClean,
    bookListRequestWithPagination,
} from '../../../store/books';
import { getBookList, getIsAllBooksListDownloaded } from '../../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBooksOrderAsc } from '../../../store/search';
import { booksFilterStatusSelector, booksOrder } from '../../../store/search/selectors';
import { BookCardAdmin } from '../book-card-admin';
import { MenuAdmin } from '../menu-admin/menu-admin';

import styles from './books-list-admin.module.scss';

export const BooksListAdmin = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState('');
    const bookList = useAppSelector(getBookList);
    const isAllBooksListDownloaded = useAppSelector(getIsAllBooksListDownloaded);
    const { isBooked, isIssued } = useAppSelector(booksFilterStatusSelector);
    const isBooksOrderAsc = useSelector(booksOrder);

    const [pageNumber, setPageNumber] = useState(1);
    const [lastHTMLElement, setLastHTMLElement] = useState<HTMLLIElement | null>(null);

    const setRef = (HTMLElement: HTMLLIElement) => {
        setLastHTMLElement(HTMLElement);
    };

    const handleIntersection = useCallback(() => {
        if (!isAllBooksListDownloaded) setPageNumber((currentPage) => currentPage + 1);
    }, [isAllBooksListDownloaded]);

    useInfiniteScroll({
        triggerRef: lastHTMLElement,
        callback: handleIntersection,
    });

    const getBooksByPagination = () => {
        dispatch(
            bookListRequestWithPagination({
                pageNumber,
                isBooked,
                isIssued,
                isBooksOrderAsc,
            }),
        );
    };

    const handleSearchInput = (value: string) => {
        setSearchValue(value);
    };

    const handleSortDirection = (value: boolean) => {
        dispatch(setBooksOrderAsc(value ? true : false));
    };

    useEffect(() => {
        dispatch(bookListRequestClean());
        dispatch(bookListRequestAllDownloaded(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getBooksByPagination();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    useEffect(() => {
        if (pageNumber === 1) {
            getBooksByPagination();
        } else {
            setPageNumber(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBooked, isIssued, isBooksOrderAsc]);

    return (
        <section className={styles.adminPage}>
            <MenuAdmin
                className={styles.menu}
                handleSearchInput={handleSearchInput}
                handleSortDirection={handleSortDirection}
                searchValue={searchValue}
            />
            <ul>
                {bookList?.map((book, index) => (
                    <BookCardAdmin
                        key={book.id}
                        className={styles.bookCard}
                        image={book.image}
                        title={book.title}
                        booking={book.booking}
                        delivery={book.delivery}
                        ref={index === bookList.length - 1 ? setRef : null}
                    />
                ))}
            </ul>
        </section>
    );
};
