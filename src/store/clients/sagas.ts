import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { CLIENTS_URL } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { MESSAGES } from '../../constants/toast-messages';
import { setToast } from '../view';

import { ClientData, ClientsListItem } from './types';
import {
    clientBlock,
    clientBlockFailure,
    clientBlockSuccess,
    clientRequest,
    clientRequestFailure,
    clientRequestSuccess,
    clientsListRequest,
    clientsListRequestFailure,
    clientsListRequestSuccess,
    clientUnblock,
    clientUnblockFailure,
    clientUnblockSuccess,
    toggleClientBlocking,
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

function* clientBlockWorker({ payload }: PayloadAction<number>) {
    try {
        yield call(axiosInstance.get, `${CLIENTS_URL.permissions}/${payload}/block`);

        yield put(toggleClientBlocking({ id: payload, status: true }));
        yield put(clientBlockSuccess());
        yield put(setToast({ type: TOAST.success, text: MESSAGES.clientBlocked }));
    } catch {
        yield put(clientBlockFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.clientBlockError }));
    }
}

function* clientUnblockWorker({ payload }: PayloadAction<number>) {
    try {
        yield call(axiosInstance.get, `${CLIENTS_URL.permissions}/${payload}/unblock`);

        yield put(toggleClientBlocking({ id: payload, status: false }));
        yield put(clientUnblockSuccess());
        yield put(setToast({ type: TOAST.success, text: MESSAGES.clientUnblocked }));
    } catch {
        yield put(clientUnblockFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.clientUnblockError }));
    }
}

export function* watchClientListRequest() {
    yield takeLatest(clientsListRequest, clientsListRequestWorker);
}

export function* watchClientRequest() {
    yield takeLatest(clientRequest, clientRequestWorker);
}

export function* watchClientBlock() {
    yield takeLatest(clientBlock, clientBlockWorker);
}

export function* watchClientUnblock() {
    yield takeLatest(clientUnblock, clientUnblockWorker);
}
