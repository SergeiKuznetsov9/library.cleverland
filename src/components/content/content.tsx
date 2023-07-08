import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { bookListRequestClean, bookListRequestWithPagination } from '../../store/books';
import {
    getBookList,
    getIsAllBooksListDownloaded,
    getLoadingBooksList,
} from '../../store/books/selectors';
import { BookListItem } from '../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';
import { createSortCriteriaQueryParams } from '../../utils/query-params-creators';
import { Card } from '../card';

import styles from './content.module.scss';

type ContentProps = {
    menuView: string;
};

export const Content = ({ menuView }: ContentProps) => {
    const [pageNumber, setPageNumber] = useState(1);
    const firstUpdateFlag = useRef(true);
    const dispatch = useAppDispatch();
    const { category } = useParams();
    const bookList = useAppSelector(getBookList);
    const [bookListForRender, setBookListForRender] = useState<BookListItem[]>([]);
    const isLoading = useAppSelector(getLoadingBooksList);
    const isAllDownloaded = useAppSelector(getIsAllBooksListDownloaded);
    const { filter, sortCriteria, bookingFree } = useAppSelector(searchSelector);

    const listClassName = classNames(
        menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
    );

    const getBooksByPagination = () => {
        dispatch(
            bookListRequestWithPagination({
                pageNumber,
                category: category as string,
                sortingCriteria: createSortCriteriaQueryParams(sortCriteria),
                filter,
            }),
        );
    };

    useEffect(() => {
        dispatch(bookListRequestClean());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        getBooksByPagination();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    useEffect(() => {
        if (!firstUpdateFlag.current) {
            dispatch(bookListRequestClean());
            if (pageNumber === 1) {
                getBooksByPagination();
            } else {
                setPageNumber(1);
            }
        } else {
            firstUpdateFlag.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortCriteria, category, filter]);

    useEffect(() => {
        const booksForRender = bookList?.filter((book) => !bookingFree || !book.booking);

        setBookListForRender(booksForRender || []);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookList, bookingFree]);

    return (
        <main data-test-id='content'>
            {bookListForRender &&
                (bookListForRender.length === 0 ? (
                    filter ? (
                        <div
                            className={styles.emptyDataText}
                            data-test-id='search-result-not-found'
                        >
                            По запросу ничего не найдено
                        </div>
                    ) : (
                        <div className={styles.emptyDataText} data-test-id='empty-category'>
                            В этой категории книг ещё нет
                        </div>
                    )
                ) : (
                    <ul
                        className={classNames(
                            menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
                            listClassName,
                        )}
                        data-test-id='cards-list'
                    >
                        {bookListForRender?.map((book) => (
                            <Card data={book} key={book.id} menuView={menuView} />
                        ))}
                    </ul>
                ))}
        </main>
    );
};
