import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { clientRequest } from '../../store/clients';
import { getClientInfo } from '../../store/clients/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { UserInfoBooked } from './user-info-booked/user-info-booked';
import { UserInfoData } from './user-info-data/user-info-data';
import { UserInfoHeader } from './user-info-header/user-info-header';
import { UserInfoHistory } from './user-info-history/user-info-history';
import { UserInfoIssued } from './user-info-issued/user-info-issued';

import styles from './admin-user-info.module.scss';

export const AdminUserInfo = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const clientInfo = useAppSelector(getClientInfo);

    useEffect(() => {
        dispatch(clientRequest(id as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.AdminUserInfo}>
            {clientInfo && (
                <React.Fragment>
                    <UserInfoHeader client={clientInfo} />
                    <UserInfoData className={styles.marginBetweenSections} client={clientInfo} />
                    <UserInfoBooked className={styles.marginBetweenSections} client={clientInfo} />
                    <UserInfoIssued className={styles.marginBetweenSections} client={clientInfo} />
                    <UserInfoHistory className={styles.marginForLastSections} client={clientInfo} />
                </React.Fragment>
            )}
        </section>
    );
};
