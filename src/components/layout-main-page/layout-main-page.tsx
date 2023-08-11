import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Navigation } from '../navigation';
import { NavigationAdmin } from '../navigation-admin';

import styles from './layout-main-page.module.scss';

export const LayoutMainPage = () => {
    const { pathname } = useLocation();
    const [isAdminNav, setIsAdminNav] = useState(pathname.includes('admin'));

    useEffect(() => {
        if (pathname.includes('admin')) {
            // добавить проверку роли
            setIsAdminNav(true);
        } else {
            setIsAdminNav(false);
        }
    }, [pathname]);

    return (
        <div className={styles.layoutMainPage}>
            <div className={styles.navigation}>
                {isAdminNav ? <NavigationAdmin /> : <Navigation dataTestid='navigation' />}
            </div>
            <Outlet />
        </div>
    );
};
