import classNames from 'classnames';

import { ClientData } from '../../../store/clients/types';

import { InfoField } from './info-field/info-field';

import styles from './user-info-data.module.scss';

type UserInfoDataProps = {
    className?: string;
    client?: ClientData;
};

export const UserInfoData = ({ className, client }: UserInfoDataProps) => (
    <div className={classNames(styles.UserInfoData, className)}>
        <h3 className={styles.header}>Учетные данные</h3>
        <div className={styles.dataFields}>
            <InfoField className={styles.firstBlock} placeHolder='Имя' data={client?.firstName} />
            <InfoField
                className={styles.secondBlock}
                placeHolder='Фамилия'
                data={client?.lastName}
            />
            <InfoField
                className={styles.thirdBlock}
                placeHolder='Номер телефона'
                data={client?.phone}
            />
            <InfoField className={styles.fourthBlock} placeHolder='E-mail' data={client?.email} />
        </div>
    </div>
);
