import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { NAV_MENU_MAIN } from '../../../constants/nav-menu-list';
import { ROUTES } from '../../../constants/routes';
import { setAuthenticated } from '../../../store/auth';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getUserFullInfoSelector } from '../../../store/user/selectors';

import styles from './header-user-popup.module.scss';

type HeaderUserPopupProps = {
    className?: string;
    onClickItemMenu?: () => void;
};

export const HeaderUserPopup = ({ className, onClickItemMenu }: HeaderUserPopupProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { role } = useAppSelector(getUserFullInfoSelector);
    const { pathname } = useLocation();

    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        dispatch(setAuthenticated(false));
        navigate(ROUTES.auth, { replace: true });
    };

    return (
        <div data-test-id='popup' className={classNames(styles.popUp, className)}>
            <Link
                className={styles.popUpItem}
                to={pathname.includes('admin') ? ROUTES.adminProfile : ROUTES.profile}
                data-test-id='profile-button'
                onClick={onClickItemMenu}
            >
                {NAV_MENU_MAIN.profile.name}
            </Link>
            {role?.type === 'admin' && (
                <Link className={styles.popUpItem} to={ROUTES.admin} onClick={onClickItemMenu}>
                    {NAV_MENU_MAIN.admin.name}
                </Link>
            )}
            <button type='button' className={styles.popUpItem} onClick={logout}>
                {NAV_MENU_MAIN.exit.name}
            </button>
        </div>
    );
};
