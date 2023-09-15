import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IssuePayload, IssuesType } from './types';

export const initialState: IssuesType = {
    issue: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    return: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
};

export const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        issueRequest: (state, action: PayloadAction<IssuePayload>) => {
            state.issue.isLoading = true;
        },

        issueRequestSuccess: (state) => {
            state.issue.isLoading = false;
            state.issue.isError = false;
            state.issue.isSuccess = true;
        },
        issueRequestFailure: (state) => {
            state.issue.isLoading = false;
            state.issue.isError = true;
            state.issue.isSuccess = false;
        },
        returnRequest: (
            state,
            action: PayloadAction<{ isIssued: boolean; deliveryId: number }>,
        ) => {
            state.return.isLoading = true;
        },

        returnRequestSuccess: (state) => {
            state.return.isLoading = false;
            state.return.isError = false;
            state.return.isSuccess = true;
        },
        returnRequestFailure: (state) => {
            state.return.isLoading = false;
            state.return.isError = true;
            state.return.isSuccess = false;
        },
    },
});

export const {
    issueRequest,
    issueRequestSuccess,
    issueRequestFailure,
    returnRequest,
    returnRequestSuccess,
    returnRequestFailure,
} = issueSlice.actions;
