import { ClientsListItem } from '../store/clients/types';

export const filterUsers = (clientsList: ClientsListItem[], searchValue: string) =>
    clientsList.filter(
        (client) =>
            client.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            client.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            client.phone.toLowerCase().includes(searchValue.toLowerCase()),
    );
