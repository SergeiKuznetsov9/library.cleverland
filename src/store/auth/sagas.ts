import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { AUTH_URL } from '../../constants/api';

import {
    AuthError,
    AuthResponse,
    Credentials,
    ForgotCredentials,
    RegistrationData,
    ResetPasswordCredentials,
} from './types';
import {
    authFailure,
    authRequest,
    authSuccess,
    createPasswordFailure,
    createPasswordRequest,
    createPasswordSuccess,
    forgotPasswordFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    registrationFailure,
    registrationRequest,
    registrationSuccess,
    setIsAlredyUsedError,
} from '.';

function* authRequestWorker({ payload }: PayloadAction<Credentials>) {
    try {
        const response: AxiosResponse<AuthResponse> = yield call(
            axios.post,
            AUTH_URL.login,
            payload,
        );

        const { jwt, user } = response.data;

        localStorage.setItem('user', JSON.stringify(user));
        Cookies.set('token', jwt);
        yield put(authSuccess(user));
    } catch (error) {
        const { response } = error as AxiosError;

        if (response?.status === 400) {
            yield put(
                authFailure(
                    (response as AxiosResponse<{ error: { message: string } }>).data.error.message,
                ),
            );
        } else {
            yield put(authFailure(true));
        }
    }
}

function* registrationRequestWorker({ payload }: PayloadAction<RegistrationData>) {
    try {
        yield call(axios.post, AUTH_URL.register, payload);
        yield put(registrationSuccess());
    } catch (error) {
        const { response } = error as AxiosError<AuthError>;

        if (response?.status === 400) {
            yield put(setIsAlredyUsedError());
        } else {
            yield put(registrationFailure(response?.data.error.message || ' '));
        }
    }
}

function* forgotPasswordRequestWorker({ payload }: PayloadAction<ForgotCredentials>) {
    try {
        yield call(axios.post, AUTH_URL.recovery, payload);

        yield put(forgotPasswordSuccess());
    } catch (error) {
        const { response } = error as AxiosError<AuthError>;

        yield put(forgotPasswordFailure(response?.data.error.message || ''));
    }
}

function* resetPasswordRequestWorker({ payload }: PayloadAction<ResetPasswordCredentials>) {
    try {
        yield call(axios.post, AUTH_URL.reset, payload);

        yield put(createPasswordSuccess());
    } catch (error) {
        const { response } = error as AxiosError<AuthError>;

        yield put(createPasswordFailure(response?.data.error.message || ''));
    }
}

export function* watchAuthRequest() {
    yield takeLatest(authRequest, authRequestWorker);
}
export function* watchRegistrationRequest() {
    yield takeLatest(registrationRequest, registrationRequestWorker);
}
export function* watchForgotPasswordRequest() {
    yield takeLatest(forgotPasswordRequest, forgotPasswordRequestWorker);
}
export function* watchResetPasswordRequest() {
    yield takeLatest(createPasswordRequest, resetPasswordRequestWorker);
}
