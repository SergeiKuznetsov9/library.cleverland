import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import { ROUTES } from '../../constants/routes';
import { USER } from '../../constants/user';
import { setAuthenticated } from '../../store/auth';
import { useAppDispatch } from '../../store/hooks';

import styles from './header-user.module.scss';

type HeaderUserProps = {
    userFirstName?: string;
    avatar?: string;
};

export const HeaderUser = ({ userFirstName, avatar }: HeaderUserProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        dispatch(setAuthenticated(false));
        navigate(ROUTES.auth, { replace: true });
    };

    return (
        <div className={styles.headerUser} data-test-id='profile-header'>
            <span className={styles.userName}>{`Привет, ${userFirstName}!`}</span>
            <div className={styles.userImg}>
                <img src={avatar ? avatar : USER.img} alt='user-img' className={styles.img} />
            </div>
            <div data-test-id='popup' className={classNames(styles.popUp, styles.active)}>
                <Link
                    className={styles.popUpItem}
                    to={ROUTES.profile}
                    data-test-id='profile-button'
                >
                    {NAV_MENU_MAIN.profile.name}
                </Link>
                <Link className={styles.popUpItem} to={ROUTES.admin}>
                    {NAV_MENU_MAIN.admin.name}
                </Link>
                <button type='button' className={styles.popUpItem} onClick={logout}>
                    {NAV_MENU_MAIN.exit.name}
                </button>
            </div>
        </div>
    );
};
