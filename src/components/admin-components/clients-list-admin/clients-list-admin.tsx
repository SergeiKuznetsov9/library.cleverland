import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { clientsListRequest, clientsListRequestClean } from '../../../store/clients';
import {
    getClientsBlockedList,
    getClientsHoldersList,
    getClientsList,
} from '../../../store/clients/selectors';
import { ClientsListItem } from '../../../store/clients/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clientsFilterStatusSelector } from '../../../store/search/selectors';
import { ClientCardAdmin } from '../client-card-admin';
import { MenuAdmin } from '../menu-admin/menu-admin';

import styles from './clients-list-admin.module.scss';

export const ClientsListAdmin = () => {
    const { all, holders, blocked } = useAppSelector(clientsFilterStatusSelector);
    const clientsList = useAppSelector(getClientsList);
    const clientsBlockedList = useAppSelector(getClientsBlockedList);
    const clientsHoldersList = useAppSelector(getClientsHoldersList);
    const [searchValue, setSearchValue] = useState('');
    const [isSortDesc, setIsSortDesc] = useState(true);
    const [clientsListForRender, setClientsListForRender] = useState(clientsList);

    const dispatch = useAppDispatch();

    const getClientsByPagination = () => {
        dispatch(clientsListRequest());
    };

    const handleSearchInput = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const handleSortDirection = useCallback((value: boolean) => {
        setIsSortDesc(value);
    }, []);

    const filterUsers = (clientsList: ClientsListItem[]) =>
        clientsList.filter(
            (client) =>
                client.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                client.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                client.username.toLowerCase().includes(searchValue.toLowerCase()),
        );

    useEffect((): (() => void) => {
        getClientsByPagination();

        return () => dispatch(clientsListRequestClean());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (all) {
            setClientsListForRender(
                searchValue ? filterUsers(clientsList ?? []) : clientsList ?? [],
            );
        }
        if (holders) {
            setClientsListForRender(
                searchValue ? filterUsers(clientsHoldersList) : clientsHoldersList,
            );
        }
        if (blocked) {
            setClientsListForRender(
                searchValue ? filterUsers(clientsBlockedList) : clientsBlockedList,
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [all, holders, blocked, clientsList, clientsHoldersList, clientsBlockedList, searchValue]);

    return (
        <section className={styles.adminPage}>
            <MenuAdmin
                className={styles.menu}
                handleSearchInput={handleSearchInput}
                searchValue={searchValue}
                handleSortDirection={handleSortDirection}
                searchingInputPlaceholder='Поиск пользователя...'
            />
            <ul>
                {clientsListForRender?.map((client) => (
                    <Link key={client.id} to={`${client.id}`}>
                        <ClientCardAdmin
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
                    </Link>
                ))}
            </ul>
        </section>
    );
};
