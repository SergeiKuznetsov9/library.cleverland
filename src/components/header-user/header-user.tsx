import classNames from 'classnames';

import { USER } from '../../constants/user';

import { HeaderUserPopup } from './header-user-popup/header-user-popup';

import styles from './header-user.module.scss';

type HeaderUserProps = {
    className?: string;
    userFirstName?: string;
    avatar?: string;
};

export const HeaderUser = ({ className, userFirstName, avatar }: HeaderUserProps) => (
    <div className={classNames(styles.headerUser, className)} data-test-id='profile-header'>
        <span className={styles.userName}>{`Привет, ${userFirstName}!`}</span>
        <div className={styles.userImg}>
            <img src={avatar ? avatar : USER.img} alt='user-img' className={styles.img} />
        </div>
        <HeaderUserPopup className={styles.popupBlock} />
    </div>
);
