import { RootState } from '..';

export const getClientsList = (state: RootState) => state.clients.clientsList.data;
export const getClientsListIsLoading = (state: RootState) => state.clients.clientsList.isLoading;
