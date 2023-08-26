import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { CLIENTS_URL } from '../../constants/api';

import { ClientData, ClientsListItem } from './types';
import {
    clientRequest,
    clientRequestFailure,
    clientRequestSuccess,
    clientsListRequest,
    clientsListRequestFailure,
    clientsListRequestSuccess,
} from '.';

function* clientsListRequestWorker() {
    try {
        const response: AxiosResponse<ClientsListItem[]> = yield call(
            axiosInstance.get,
            CLIENTS_URL.clients,
        );

        yield put(clientsListRequestSuccess(response.data));
    } catch {
        yield put(clientsListRequestFailure());
    }
}

function* clientRequestWorker({ payload }: PayloadAction<string>) {
    try {
        const response: AxiosResponse<ClientData> = yield call(
            axiosInstance.get,
            `${CLIENTS_URL.clients}/${payload}`,
        );

        yield put(clientRequestSuccess(response.data));
    } catch {
        yield put(clientRequestFailure());
    }
}

export function* watchClientListRequest() {
    yield takeLatest(clientsListRequest, clientsListRequestWorker);
}

export function* watchClientRequest() {
    yield takeLatest(clientRequest, clientRequestWorker);
}
