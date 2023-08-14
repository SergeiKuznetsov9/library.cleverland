import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HEADER_TITLE } from '../../constants/location';
import { bookCategoriesRequest } from '../../store/books';
import { useAppDispatch } from '../../store/hooks';
import { searchbookList } from '../../store/search';
import { BurgerMenu } from '../burger-menu';
import { HeaderUser } from '../header-user';

import logo from './assets/logo.svg';

import styles from './header.module.scss';

type HeaderPropsType = {
    path: string;
    userFirstName?: string;
    avatar?: string;
};

export const Header = ({ path, userFirstName, avatar }: HeaderPropsType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bookCategoriesRequest());
    }, [dispatch]);

    const resetSearchValue = () => {
        dispatch(searchbookList(''));
    };

    return (
        <header className={styles.header} data-test-id='header'>
            <Link
                to='/'
                className={styles.headerLink}
                onClick={resetSearchValue}
                data-test-id='header-logo-link'
            >
                <img src={logo} alt='logo' className={styles.logo} />
            </Link>
            <BurgerMenu />

            <div className={styles.block}>
                <h2 className={styles.title}>
                    {path.includes('all')
                        ? HEADER_TITLE.library
                        : HEADER_TITLE[path as keyof typeof HEADER_TITLE]}
                </h2>
            </div>
            <HeaderUser
                avatar={avatar}
                userFirstName={userFirstName}
                className={styles.hideUserMenu}
            />
        </header>
    );
};
