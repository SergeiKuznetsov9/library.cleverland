import classNames from 'classnames';

import { ClientData } from '../../../store/clients/types';

import imgFile from './assets/avatar.jpg';
import { BlockLabel } from './block-label/block-label';

import styles from './user-info-header.module.scss';

type UserInfoHeaderProps = {
    client: ClientData;
};

export const UserInfoHeader = ({ client }: UserInfoHeaderProps) => (
    <div
        className={classNames(styles.UserInfoHeader, {
            [styles.blockBackground]: client.blocked,
        })}
    >
        <div className={styles.imageWrapper}>
            <img
                className={styles.image}
                src={client.avatar ? client.avatar : imgFile}
                alt='profile-avatar'
            />
        </div>
        <div className={styles.profileName}>
            <span>{client.lastName}</span>
            <span>{client.firstName}</span>
        </div>
        {client.blocked && <BlockLabel className={styles.blockLabel} />}
    </div>
);
