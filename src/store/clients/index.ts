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
    clientBlock: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    clientUnblock: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
};

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsListRequest: (state) => {
            state.clientsList.isLoading = true;
            state.clientsList.isError = false;
            state.clientsList.isSuccess = false;
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
            state.client.isError = false;
            state.client.isSuccess = false;
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

        clientBlock: (state, action: PayloadAction<number>) => {
            state.clientBlock.isLoading = true;
            state.clientBlock.isError = false;
            state.clientBlock.isSuccess = false;
        },
        clientBlockSuccess: (state) => {
            state.clientBlock.isLoading = false;
            state.clientBlock.isError = false;
            state.clientBlock.isSuccess = true;
        },
        clientBlockFailure: (state) => {
            state.clientBlock.isLoading = false;
            state.clientBlock.isError = true;
            state.clientBlock.isSuccess = false;
        },

        clientUnblock: (state, action: PayloadAction<number>) => {
            state.clientUnblock.isLoading = true;
            state.clientUnblock.isError = false;
            state.clientUnblock.isSuccess = false;
        },
        clientUnblockSuccess: (state) => {
            state.clientUnblock.isLoading = false;
            state.clientUnblock.isError = false;
            state.clientUnblock.isSuccess = true;
        },
        clientUnblockFailure: (state) => {
            state.clientUnblock.isLoading = false;
            state.clientUnblock.isError = true;
            state.clientUnblock.isSuccess = false;
        },

        toggleClientBlocking: (state, action: PayloadAction<{ id: number; status: boolean }>) => {
            const { id, status } = action.payload;

            state.clientsList.data =
                state.clientsList.data?.map((client) => {
                    if (client.id === id) {
                        return { ...client, blocked: status };
                    }

                    return client;
                }) ?? null;
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

    clientBlock,
    clientBlockSuccess,
    clientBlockFailure,

    clientUnblock,
    clientUnblockSuccess,
    clientUnblockFailure,

    toggleClientBlocking,
} = clientsSlice.actions;
