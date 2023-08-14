import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBooksFilter, setClientsFilter } from '../../../store/search';
import {
    booksFilterStatusSelector,
    clientsFilterStatusSelector,
} from '../../../store/search/selectors';
import { BooksFilterKeys, ClientsFilterKeys } from '../../../store/search/types';
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
    const { booked, issued } = useAppSelector(booksFilterStatusSelector);
    const { books, users } = NavigationItems;

    const onToggleBooksFilter = (filterName: BooksFilterKeys, filterValue: boolean) => {
        dispatch(setBooksFilter({ filterName, filterValue }));
    };

    const onToggleClientssFilter = (filterName: ClientsFilterKeys, filterValue: boolean) => {
        dispatch(setClientsFilter({ filterName, filterValue }));
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
                            onToggle={() => onToggleBooksFilter(BooksFilters.BOOKED, !booked)}
                            status={booked}
                        />
                    </li>
                    <li className={styles.listItem}>
                        <Checkbox
                            label={books.checkBoxes.issued}
                            onToggle={() => onToggleBooksFilter(BooksFilters.ISSUED, !issued)}
                            status={issued}
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
                            onToggle={() => onToggleClientssFilter(UsersFilters.ALL, !all)}
                            status={all}
                        />
                    </li>
                    <li className={styles.listItem}>
                        <Checkbox
                            label={users.checkBoxes.holders}
                            onToggle={() => onToggleClientssFilter(UsersFilters.HOLDERS, !holders)}
                            status={holders}
                        />
                    </li>
                    <li className={styles.listItem}>
                        <Checkbox
                            label={users.checkBoxes.blocked}
                            onToggle={() => onToggleClientssFilter(UsersFilters.BLOCKED, !blocked)}
                            status={blocked}
                        />
                    </li>
                </ul>
            </li>
        </ul>
    );
};
