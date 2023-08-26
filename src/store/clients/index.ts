import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ClientData, ClientsListItem, ClientsType } from './types';

export const initialState: ClientsType = {
    clientsList: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        isAllDownloaded: false,
    },
    client: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
};

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsListRequest: (state) => {
            state.clientsList.isLoading = true;
        },
        clientsListRequestAllDownloaded: (state, action: PayloadAction<boolean>) => {
            state.clientsList.isAllDownloaded = action.payload;
        },
        clientsListRequestSuccess: (state, action: PayloadAction<ClientsListItem[]>) => {
            state.clientsList.isLoading = false;
            state.clientsList.isError = false;
            state.clientsList.isSuccess = true;
            state.clientsList.data = action.payload;
        },
        clientsListRequestFailure: (state) => {
            state.clientsList.isLoading = false;
            state.clientsList.isError = true;
            state.clientsList.isSuccess = false;
            state.clientsList.data = null;
        },
        clientsListRequestClean: (state) => {
            state.clientsList.data = null;
        },
        clientRequest: (state, action: PayloadAction<string>) => {
            state.client.isLoading = true;
        },
        clientRequestSuccess: (state, action: PayloadAction<ClientData>) => {
            state.client.isLoading = false;
            state.client.isError = false;
            state.client.isSuccess = true;
            state.client.data = action.payload;
        },
        clientRequestFailure: (state) => {
            state.client.isLoading = false;
            state.client.isError = true;
            state.client.isSuccess = false;
            state.client.data = null;
        },
        resetClientData: (state) => {
            state.client.data = null;
        },
    },
});

export const {
    clientsListRequest,
    clientsListRequestAllDownloaded,
    clientsListRequestSuccess,
    clientsListRequestFailure,
    clientsListRequestClean,
    clientRequest,
    clientRequestSuccess,
    clientRequestFailure,
    resetClientData,
} = clientsSlice.actions;
