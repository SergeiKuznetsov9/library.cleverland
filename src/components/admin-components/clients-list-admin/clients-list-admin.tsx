import { useEffect } from 'react';

import { clientsListRequest, clientsListRequestClean } from '../../../store/clients';
import { getClientsList } from '../../../store/clients/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ClientCardAdmin } from '../client-card-admin';
import { MenuAdmin } from '../menu-admin/menu-admin';

import styles from './clients-list-admin.module.scss';

export const ClientsListAdmin = () => {
    const clientsList = useAppSelector(getClientsList);

    const dispatch = useAppDispatch();

    const getClientsByPagination = () => {
        dispatch(clientsListRequest());
    };

    useEffect((): (() => void) => {
        getClientsByPagination();

        return () => dispatch(clientsListRequestClean());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearchInput = (value: string) => {
        console.log('clients', value);
    };

    const handleSortDirection = (value: boolean) => {
        console.log('clients', value);
    };

    return (
        <section className={styles.adminPage}>
            <MenuAdmin
                className={styles.menu}
                handleSearchInput={handleSearchInput}
                handleSortDirection={handleSortDirection}
            />
            {clientsList?.map((client) => (
                <ClientCardAdmin
                    key={client.id}
                    className={styles.clientCard}
                    avatar={client.avatar}
                    firstName={client.firstName}
                    lastName={client.lastName}
                    username={client.username}
                    historyCount={client.historyCount}
                    createdAt={client.createdAt}
                    phone={client.phone}
                    blocked={client.blocked}
                    delivery={client.delivery}
                />
            ))}
        </section>
    );
};
