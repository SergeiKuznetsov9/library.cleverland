import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { ISSUE_URL } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { MESSAGES } from '../../constants/toast-messages';
import { addDeliveryStateToBook, removeIssuedBook } from '../books';
import { setToast } from '../view';

import { DeliveryModel, IssuePayload } from './types';
import { issueRequest, issueRequestFailure, issueRequestSuccess } from '.';

function* issueRequestWorker({ payload }: PayloadAction<IssuePayload>) {
    try {
        const response: AxiosResponse<any> = yield call(
            axiosInstance.post,
            ISSUE_URL.issue,
            payload,
        );

        const { data } = response;

        const deliveryModel: DeliveryModel = {
            dateHandedFrom: data.attributes.dateHandedFrom,
            dateHandedTo: data.attributes.dateHandedTo,
            handed: true,
            id: data.id,
            recipientFirstName: payload.data.recipientFirstName as string,
            recipientId: payload.data.recipient,
            recipientLastName: payload.data.recipientLastName as string,
        };

        yield put(issueRequestSuccess());

        if (payload.data.isBooked) {
            yield put(removeIssuedBook(payload.data.book));
        } else {
            yield put(addDeliveryStateToBook({ deliveryModel, bookId: payload.data.book }));
        }

        yield put(setToast({ type: TOAST.success, text: MESSAGES.issue }));
    } catch {
        yield put(issueRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.issueError }));
    }
}

export function* watchIssueRequest() {
    yield takeLatest(issueRequest, issueRequestWorker);
}
