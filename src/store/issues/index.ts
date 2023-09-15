import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { IssuesType } from './types';

export const initialState: IssuesType = {
    issue: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
};

export const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        issueRequest: (state, action: PayloadAction<any>) => {
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
    },
});

export const { issueRequest, issueRequestSuccess, issueRequestFailure } = issueSlice.actions;
