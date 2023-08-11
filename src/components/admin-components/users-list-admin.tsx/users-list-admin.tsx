import { useState } from 'react';

import styles from './users-list-admin.module.scss';
// import { BookCardAdmin } from '../book-card-admin';

export const UsersListAdmin = () => {
    // const bookList = useAppSelector(getBookList);
    // console.log(bookList);
    const [pageNumber, setPageNumber] = useState(1);
    // const dispatch = useAppDispatch();

    // const getBooksByPagination = () => {
    //     dispatch(
    //         bookListRequestWithPagination({
    //             pageNumber,
    //             category: 'all',
    //             sortingCriteria: createSortCriteriaQueryParams([]),
    //         }),
    //     );
    // };

    // useEffect(() => {
    //     getBooksByPagination();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pageNumber]);

    return (
        <section className={styles.adminPage}>
            {/* {bookList?.map((book) => (
                <BookCardAdmin
                    className={styles.bookCard}
                    image={book.image}
                    title={book.title}
                    booking={book.booking}
                    delivery={book.delivery}
                />
            ))} */}
            Users List
        </section>
    );
};
