import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    bookListRequestAllDownloaded,
    bookListRequestClean,
    bookListRequestWithPagination,
} from '../../../store/books';
import {
    getBookList,
    getIsAllBooksListDownloaded,
    getLoadingBooksList,
} from '../../../store/books/selectors';
import { BookListItem } from '../../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBooksOrderAsc } from '../../../store/search';
import { booksFilterStatusSelector, booksOrder } from '../../../store/search/selectors';
import { BookCardAdmin } from '../book-card-admin';
import { MenuAdmin } from '../menu-admin/menu-admin';

import styles from './books-list-admin.module.scss';

export const BooksListAdmin = () => {
    const dispatch = useAppDispatch();
    const bookList = useAppSelector(getBookList);
    const isAllDownloaded = useAppSelector(getIsAllBooksListDownloaded);
    const isLoading = useAppSelector(getLoadingBooksList);
    const { isBooked, isIssued } = useAppSelector(booksFilterStatusSelector);
    const isBooksOrderAsc = useSelector(booksOrder);

    const [filteredBookList, setFilteredBookList] = useState<BookListItem[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [noScroll, setNoScroll] = useState(true);
    const [isSearchingTouched, setIsSearchingTouched] = useState(false);

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

    const filterBooks = () =>
        bookList?.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()));

    const handleSearchInput = (value: string) => {
        setSearchValue(value);
        if (!isSearchingTouched) {
            setIsSearchingTouched(true);
        }
    };

    const handleSortDirection = (value: boolean) => {
        dispatch(setBooksOrderAsc(value ? true : false));
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { innerHeight } = window;
            const scrollBlockHeight = entries[0].contentRect.height;

            if (innerHeight >= scrollBlockHeight) {
                setNoScroll(true);
            } else {
                setNoScroll(false);
            }
        });

        resizeObserver.observe(document.documentElement);

        return () => resizeObserver.unobserve(document.documentElement);
    }, []);

    useEffect(() => {
        if (noScroll && isSearchingTouched && !isAllDownloaded) {
            setPageNumber((currentPage) => currentPage + 1);
        }
    }, [noScroll, isSearchingTouched, isAllDownloaded, bookList]);

    useEffect(() => {
        if (searchValue && filterBooks()?.length === filteredBookList.length && !isAllDownloaded) {
            setPageNumber((currentPage) => currentPage + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookList]);

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

    useEffect(() => {
        const scrollHandler = (event: any) => {
            const { innerHeight } = window;
            const { scrollTop } = event.target.documentElement;
            const { offsetHeight } = event.target.documentElement;

            if (scrollTop + innerHeight >= offsetHeight - 100 && !isLoading && !isAllDownloaded) {
                setPageNumber((currentPage) => currentPage + 1);
                document.removeEventListener('scroll', scrollHandler);
            }
        };

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        setFilteredBookList(filterBooks() ?? []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, bookList]);

    return (
        <section className={styles.adminPage}>
            <MenuAdmin
                className={styles.menu}
                handleSearchInput={handleSearchInput}
                handleSortDirection={handleSortDirection}
                searchValue={searchValue}
            />
            <ul>
                {filteredBookList?.map((book) => (
                    <BookCardAdmin
                        key={book.id}
                        id={book.id}
                        className={styles.bookCard}
                        image={book.image}
                        title={book.title}
                        booking={book.booking}
                        delivery={book.delivery}
                        searchValue={searchValue}
                    />
                ))}
            </ul>
        </section>
    );
};
