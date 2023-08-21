import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getUserFullInfoSelector } from '../../store/user/selectors';
import { NavigationAdmin } from '../admin-components/navigation-admin';
import { Navigation } from '../navigation';

import styles from './layout-main-page.module.scss';

export const LayoutMainPage = () => {
    const { pathname } = useLocation(); // TODO CustomHook, проверку роли
    const [isAdminNav, setIsAdminNav] = useState(pathname.includes('admin'));
    const { role } = useAppSelector(getUserFullInfoSelector);

    useEffect(() => {
        if (pathname.includes('admin')) {
            setIsAdminNav(true);
        } else {
            setIsAdminNav(false);
        }
    }, [pathname]);

    return (
        <div className={styles.layoutMainPage}>
            <div className={styles.navigation}>
                {isAdminNav && role.type === 'admin' ? (
                    <NavigationAdmin />
                ) : (
                    <Navigation dataTestid='navigation' />
                )}
            </div>
            <Outlet />
        </div>
    );
};
