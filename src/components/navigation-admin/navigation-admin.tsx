import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Checkbox } from '../checkbox';

import { AdminParagraphs, NavigationFilterType, NavigationItems } from './config/navigation-config';

import styles from './navigation-admin.module.scss';

type NavigationAdminProps = {
    className?: string;
};

export const NavigationAdmin = ({ className }: NavigationAdminProps) => {
    const { paragraph } = useParams();
    const [isBooked, setIsBooked] = useState(false);
    const [isIssued, setIsIssued] = useState(false);
    const [isAll, setIsAll] = useState(false);
    const [isHolders, setIsHolders] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const { books, users } = NavigationItems;

    const booksCheckBoxesState = [
        {
            setValue: () => setIsBooked((isBooked) => !isBooked),
            value: isBooked,
        },
        {
            setValue: () => setIsIssued((isIssued) => !isIssued),
            value: isIssued,
        },
    ];

    const usersCheckBoxesState = [
        {
            setValue: () => setIsAll((isAll) => !isAll),
            value: isAll,
        },
        {
            setValue: () => setIsHolders((isHolders) => !isHolders),
            value: isHolders,
        },
        {
            setValue: () => setIsLocked((isLocked) => !isLocked),
            value: isLocked,
        },
    ];

    return (
        <ul className={styles.Navigation}>
            <li>
                <NavLink
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
                    {books.checkBoxes.map((checkBox: NavigationFilterType, index: number) => (
                        <li className={styles.listItem} key={checkBox.filter}>
                            <Checkbox
                                onToggle={booksCheckBoxesState[index].setValue}
                                status={booksCheckBoxesState[index].value}
                                label={checkBox.labelFilter}
                            />
                        </li>
                    ))}
                </ul>
            </li>
            <li>
                <NavLink
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
                    {users.checkBoxes.map((checkBox: NavigationFilterType, index: number) => (
                        <li className={styles.listItem} key={checkBox.filter}>
                            <Checkbox
                                onToggle={usersCheckBoxesState[index].setValue}
                                status={usersCheckBoxesState[index].value}
                                label={checkBox.labelFilter}
                            />
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    );
};
