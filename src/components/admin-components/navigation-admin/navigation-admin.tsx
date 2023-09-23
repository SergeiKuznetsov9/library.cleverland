import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { bookListRequestClean } from '../../../store/books';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBooksFilter, setClientsFilter } from '../../../store/search';
import {
    booksFilterStatusSelector,
    clientsFilterStatusSelector,
} from '../../../store/search/selectors';
import { BooksFiltersType, ClientsFilterKeys } from '../../../store/search/types';
import { Checkbox } from '../../checkbox';

import {
    AdminParagraphs,
    BooksFilters,
    NavigationItems,
    UsersFilters,
} from './config/navigation-config';

import styles from './navigation-admin.module.scss';

type NavigationAdminProps = {
    className?: string;
    onClickItemMenu?: () => void;
};

export const NavigationAdmin = ({ className, onClickItemMenu }: NavigationAdminProps) => {
    const { paragraph } = useParams();
    const dispatch = useAppDispatch();
    const { all, holders, blocked } = useAppSelector(clientsFilterStatusSelector);
    const { isBooked, isIssued } = useAppSelector(booksFilterStatusSelector);
    const { books, users } = NavigationItems;

    const onToggleBooksFilter = (payload: BooksFiltersType) => {
        dispatch(bookListRequestClean());
        dispatch(setBooksFilter(payload));
    };

    const onToggleClientsFilter = (filterName: ClientsFilterKeys, filterValue: boolean) => {
        const payload = {
            all: false,
            holders: false,
            blocked: false,
        };

        payload[filterName] = filterValue;
        const values = Object.values(payload);

        if (!values.includes(true)) payload.all = true;

        dispatch(setClientsFilter(payload));
    };

    return (
        <ul className={styles.Navigation}>
            <li>
                <NavLink
                    onClick={onClickItemMenu}
                    to={books.to}
                    className={({ isActive }) =>
                        isActive ? classNames(styles.navLink, styles.navLinkActive) : styles.navLink
                    }
                >
                    {books.labelItem}
                </NavLink>
                <ul
                    className={classNames(styles.checkBoxesForBooksWrapper, {
                        [styles.checkBoxesWrapperHidden]: paragraph !== AdminParagraphs.BOOKS,
                    })}
                >
                    <li className={styles.listItem}>
                        <Checkbox
                            label={books.checkBoxes.booked}
                            onToggle={() =>
                                onToggleBooksFilter({
                                    [BooksFilters.IS_BOOKED]: !isBooked,
                                    [BooksFilters.IS_ISSUED]: false,
                                })
                            }
                            status={isBooked}
                        />
                    </li>
                    <li className={styles.listItem}>
                        <Checkbox
                            label={books.checkBoxes.issued}
                            onToggle={() =>
                                onToggleBooksFilter({
                                    [BooksFilters.IS_ISSUED]: !isIssued,
                                    [BooksFilters.IS_BOOKED]: false,
                                })
                            }
                            status={isIssued}
                        />
                    </li>
                </ul>
            </li>
            <li>
                <NavLink
                    onClick={onClickItemMenu}
                    to={users.to}
                    className={({ isActive }) =>
                        isActive ? classNames(styles.navLink, styles.navLinkActive) : styles.navLink
                    }
                >
                    {users.labelItem}
                </NavLink>
                <ul
                    className={classNames(styles.checkBoxesForUsersWrapper, {
                        [styles.checkBoxesWrapperHidden]: paragraph !== AdminParagraphs.USERS,
                    })}
                >
                    <li className={styles.listItem}>
                        <Checkbox
                            label={users.checkBoxes.all}
                            onToggle={() => onToggleClientsFilter(UsersFilters.ALL, !all)}
                            status={all}
                        />
                    </li>
                    <li className={styles.listItem}>
                        <Checkbox
                            label={users.checkBoxes.holders}
                            onToggle={() => onToggleClientsFilter(UsersFilters.HOLDERS, !holders)}
                            status={holders}
                        />
                    </li>
                    <li className={styles.listItem}>
                        <Checkbox
                            label={users.checkBoxes.blocked}
                            onToggle={() => onToggleClientsFilter(UsersFilters.BLOCKED, !blocked)}
                            status={blocked}
                        />
                    </li>
                </ul>
            </li>
        </ul>
    );
};
