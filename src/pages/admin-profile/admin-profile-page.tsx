import { Loader } from '../../components/loader/loader';
import { useAppSelector } from '../../store/hooks';
import { getUserSelector } from '../../store/user/selectors';

import { ProfileBody } from './profile-body';
import { ProfileHeader } from './profile-header';

import styles from './admin-profile-page.module.scss';

export const AdminProfilePage = () => {
    const { data: user, isLoading } = useAppSelector(getUserSelector);

    return (
        <div className={styles.wrapper} data-test-id='profile-page'>
            {isLoading && <Loader />}
            <ProfileHeader
                avatar={user.avatar}
                id={user.id}
                userFirstName={user?.firstName}
                userLastName={user?.lastName}
            />
            <ProfileBody user={user} />
        </div>
    );
};
