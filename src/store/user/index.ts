import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    ResponseUser,
    UpdateUserActionType,
    UploadAvatarActionType,
    UserBooking,
    UserStateType,
} from './types';

export const initialState: UserStateType = {
    isLoading: false,
    isSuccess: false,
    isUpdateSuccess: false,
    isUpdateLoading: false,
    isUpdateError: false,
    isError: false,
    data: {} as ResponseUser,
};

const initialBooking = {
    book: null,
    dateOrder: null,
    id: null,
    order: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRequest: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        userRequestSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
        },
        authenticatedUserRequest: (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        authenticatedUserSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
        },
        userRequestError: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
        updateUserRequest: (state, action: PayloadAction<UpdateUserActionType>) => {
            state.isUpdateLoading = true;
            state.isUpdateError = false;
            state.isUpdateSuccess = false;
        },
        updateUserSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isUpdateLoading = false;
            state.isUpdateError = false;
            state.isUpdateSuccess = true;
            state.data = action.payload;
        },
        uploadAvatarRequest: (state, action: PayloadAction<UploadAvatarActionType>) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        uploadAvatarSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            // state.data = action.payload;
        },
        deleteBookingUpdateUser: (state) => {
            state.data.booking = initialBooking as UserBooking;
        },
        addBookingUpdateUser: (state, action: PayloadAction<UserBooking>) => {
            state.data.booking = action.payload;
        },
    },
});

export const {
    userRequest,
    userRequestSuccess,
    userRequestError,
    authenticatedUserRequest,
    authenticatedUserSuccess,
    updateUserRequest,
    updateUserSuccess,
    uploadAvatarRequest,
    uploadAvatarSuccess,
    deleteBookingUpdateUser,
    addBookingUpdateUser,
} = userSlice.actions;
