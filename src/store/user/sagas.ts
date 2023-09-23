import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { CLIENTS_URL, FILE_UPLOAD } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { MESSAGES } from '../../constants/toast-messages';
import { setToast } from '../view';

import {
    FileUploadResponseType,
    ResponseUser,
    UpdateUserActionType,
    UploadAvatarActionType,
} from './types';
import {
    authenticatedUserRequest,
    authenticatedUserSuccess,
    updateUserRequest,
    updateUserSuccess,
    uploadAvatarRequest,
    uploadAvatarSuccess,
    userRequest,
    userRequestError,
    userRequestSuccess,
} from '.';

function* userRequestWorker({ payload }: PayloadAction<string>) {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${CLIENTS_URL.clients}/${payload}`,
        );

        yield put(userRequestSuccess(data));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.profile }));
    }
}
function* getAuthenticatedUserWorker() {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${CLIENTS_URL.clients}/me`,
        );

        yield put(authenticatedUserSuccess(data));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.profile }));
    }
}
function* updateUserWorker({ payload }: PayloadAction<UpdateUserActionType>) {
    const { id, username, password, email, firstName, lastName, phone } = payload;

    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.put,
            `${CLIENTS_URL.clients}/${id}`,
            { username, password, email, firstName, lastName, phone },
        );

        yield put(updateUserSuccess(data));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.editSuccess }));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.editError }));
    }
}
function* uploadAvatarWorker({ payload }: PayloadAction<UploadAvatarActionType>) {
    const { id, formData } = payload;

    try {
        const { data }: AxiosResponse<FileUploadResponseType[]> = yield call(
            axiosInstance.post,
            `${FILE_UPLOAD.upload}`,
            formData,
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            },
        );

        let user = {} as ResponseUser;

        const body = {
            avatar: data[0].id,
        };

        if (data) {
            const { data: userData }: AxiosResponse<ResponseUser> = yield call(
                axiosInstance.put,
                `${CLIENTS_URL.clients}/${id}`,
                body,
            );

            user = userData;
        }

        yield put(uploadAvatarSuccess(user));
        yield put(updateUserSuccess(user));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.avatar }));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.avatar }));
    }
}

export function* watchUserRequest() {
    yield takeLatest(userRequest, userRequestWorker);
    yield takeLatest(authenticatedUserRequest, getAuthenticatedUserWorker);
    yield takeLatest(updateUserRequest, updateUserWorker);
    yield takeLatest(uploadAvatarRequest, uploadAvatarWorker);
}
