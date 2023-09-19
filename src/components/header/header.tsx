import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { bookCategoriesRequest } from '../../store/books';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchBookList } from '../../store/search';
import { getUserFullInfoSelector } from '../../store/user/selectors';
import { headerTitle } from '../../utils/header-title';
import { BurgerMenu } from '../burger-menu';
import { HeaderUser } from '../header-user';

import homeLogo from './assets/home.svg';
import logo from './assets/logo.svg';

import styles from './header.module.scss';

type HeaderPropsType = {
    path: string;
    userFirstName?: string;
    avatar?: string;
};

export const Header = ({ path, userFirstName, avatar }: HeaderPropsType) => {
    const dispatch = useAppDispatch();
    const { role } = useAppSelector(getUserFullInfoSelector);

    useEffect(() => {
        dispatch(bookCategoriesRequest());
    }, [dispatch]);

    const resetSearchValue = () => {
        dispatch(searchBookList(''));
    };

    const getDownlevelUrl = () => {
        const parts = path.split('/');

        return parts.slice(0, 2).join('/');
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
                    {/^admin\/(users|books)\/\d+$/.test(path) && role.type === 'admin' ? (
                        <React.Fragment>
                            <Link to={getDownlevelUrl()}>
                                <span className={styles.secondaryText}>Администрирование</span>
                                <img className={styles.homeLogo} src={homeLogo} alt='home' />
                            </Link>{' '}
                            / {path.includes('users') && <span>Пользователь</span>}
                            {path.includes('books') && <span>Книга</span>}
                        </React.Fragment>
                    ) : (
                        headerTitle(path, role?.type)
                    )}
                </h2>
                <HeaderUser
                    avatar={avatar}
                    userFirstName={userFirstName}
                    className={styles.hideUserMenu}
                />
            </div>
        </header>
    );
};
