import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { CLIENTS_URL } from '../../constants/api';

import { ClientsListItem } from './types';
import { clientsListRequest, clientsListRequestFailure, clientsListRequestSuccess } from '.';

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

export function* watchClientListRequest() {
    yield takeLatest(clientsListRequest, clientsListRequestWorker);
}
