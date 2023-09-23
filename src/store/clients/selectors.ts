import { RootState } from '..';

export const getClientsList = (state: RootState) => state.clients.clientsList.data;

export const getClientsBlockedList = (state: RootState) =>
    state.clients.clientsList.data?.filter((client) => client.blocked) ?? [];

export const getClientsHoldersList = (state: RootState) =>
    state.clients.clientsList.data?.filter((client) => client.delivery.id) ?? [];

export const getClientInfo = (state: RootState) => state.clients.client.data;
export const getClientsListIsLoading = (state: RootState) => state.clients.clientsList.isLoading;

export const getClientIsBlocking = (state: RootState) => state.clients.clientBlock.isLoading;
export const getClientIsUnblocking = (state: RootState) => state.clients.clientUnblock.isLoading;
