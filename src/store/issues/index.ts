import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IssuePayload, IssuesType, ProlongationPayload, ReturnPayload } from './types';

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
    prolongation: {
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

        returnRequest: (state, action: PayloadAction<ReturnPayload>) => {
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

        prolongationRequest: (state, action: PayloadAction<ProlongationPayload>) => {
            state.prolongation.isLoading = true;
        },
        prolongationRequestSuccess: (state) => {
            state.prolongation.isLoading = false;
            state.prolongation.isError = false;
            state.prolongation.isSuccess = true;
        },
        prolongationRequestFailure: (state) => {
            state.prolongation.isLoading = false;
            state.prolongation.isError = true;
            state.prolongation.isSuccess = false;
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
    prolongationRequest,
    prolongationRequestSuccess,
    prolongationRequestFailure,
} = issueSlice.actions;
