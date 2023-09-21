import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { CLIENTS_URL, ISSUE_URL } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { MESSAGES } from '../../constants/toast-messages';
import { addDeliveryStateToBook, removeDeliveryStateFromBook, removeIssuedBook } from '../books';
import { ClientData } from '../clients/types';
import { setToast } from '../view';

import { DeliveryModel, IssuePayload, ProlongationPayload, ReturnPayload } from './types';
import {
    issueRequest,
    issueRequestFailure,
    issueRequestSuccess,
    prolongationRequest,
    prolongationRequestSuccess,
    returnRequest,
    returnRequestFailure,
    returnRequestSuccess,
} from '.';

function* issueRequestWorker({ payload }: PayloadAction<IssuePayload>) {
    try {
        const response: AxiosResponse<any> = yield call(
            axiosInstance.post,
            ISSUE_URL.issue,
            payload,
        );

        const { book, recipientFirstName, recipient, recipientLastName, isBooked } = payload.data;

        yield put(issueRequestSuccess());

        if (isBooked) {
            yield put(removeIssuedBook(book));
        } else {
            const {
                data: {
                    id,
                    attributes: { dateHandedFrom, dateHandedTo },
                },
            } = response;
            const deliveryModel: DeliveryModel = {
                dateHandedFrom,
                dateHandedTo,
                handed: true,
                id,
                recipientFirstName,
                recipientId: recipient,
                recipientLastName,
            };

            yield put(addDeliveryStateToBook({ deliveryModel, bookId: book }));
        }

        yield put(setToast({ type: TOAST.success, text: MESSAGES.issue }));
    } catch {
        yield put(issueRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.issueError }));
    }
}

function* createHistory(book: number, user: number) {
    try {
        yield call(axiosInstance.post, `${ISSUE_URL.history}`, {
            data: {
                book,
                user,
            },
        });

        yield put(setToast({ type: TOAST.success, text: MESSAGES.createHistory }));
    } catch (error) {
        yield put(setToast({ type: TOAST.error, text: ERROR.createHistoryError }));
    }
}

function* updateHistory(book: number, historyId: number) {
    try {
        yield call(axiosInstance.put, `${ISSUE_URL.history}/${historyId}`, {
            data: {
                book,
            },
        });
        yield put(setToast({ type: TOAST.success, text: MESSAGES.updateHistory }));
    } catch (error) {
        yield put(setToast({ type: TOAST.error, text: ERROR.updateHistoryError }));
    }
}

function* changeHistory(recipientId: number, bookId: number) {
    try {
        const responseUserData: AxiosResponse<ClientData> = yield call(
            axiosInstance.get,
            `${CLIENTS_URL.clients}/${recipientId}`,
        );

        if (!responseUserData.data.history.id) {
            yield createHistory(bookId, recipientId);
        } else {
            yield updateHistory(bookId, responseUserData.data.history.id);
        }
    } catch (error) {
        yield put(setToast({ type: TOAST.error, text: ERROR.getUserDataError }));
    }
}

function* returnRequestWorker({ payload }: PayloadAction<ReturnPayload>) {
    const { isIssued, deliveryId, bookId, recipientId } = payload;

    try {
        yield call(axiosInstance.delete, `${ISSUE_URL.issue}/${deliveryId}`);

        yield put(returnRequestSuccess());

        if (isIssued) {
            yield put(removeIssuedBook(bookId));
        } else {
            yield put(removeDeliveryStateFromBook(bookId));
        }

        yield put(setToast({ type: TOAST.success, text: MESSAGES.return }));
        yield changeHistory(recipientId, bookId);
    } catch {
        yield put(returnRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.returnError }));
    }
}

function* prolongationRequestWorker({ payload }: PayloadAction<ProlongationPayload>) {
    const { deliveryId, bookId } = payload;

    try {
        const response: AxiosResponse<any> = yield call(
            axiosInstance.put,
            `${ISSUE_URL.prolongation}/${deliveryId}`,
        );

        const { dateHandedTo } = response.data.attributes;

        yield put(prolongationRequestSuccess());
        yield put(changeIssueAtributes({ dateHandedTo, bookId }));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.prolongation }));
    } catch {
        yield put(returnRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.prolongationError }));
    }
}

export function* watchIssueRequest() {
    yield takeLatest(issueRequest, issueRequestWorker);
}

export function* watchReturnRequest() {
    yield takeLatest(returnRequest, returnRequestWorker);
}

export function* watchProlongationRequest() {
    yield takeLatest(prolongationRequest, prolongationRequestWorker);
}
function changeIssueAtributes(arg0: { dateHandedTo: any; bookId: number }): any {
    throw new Error('Function not implemented.');
}
