import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting } from '../../constants/sorting';

import { SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    sortCriteria: [],
    sortCriteriaForRequest: [],
    bookingFree: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchbookList: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setSortCriterion: (state, action: PayloadAction<Sorting[]>) => {
            state.sortCriteria = action.payload;
        },
        setSortCriterionForRequest: (state, action: PayloadAction<Sorting[]>) => {
            state.sortCriteriaForRequest = action.payload;
        },
        setBookingFree: (state, action: PayloadAction<boolean>) => {
            state.bookingFree = action.payload;
        },
    },
});

export const { searchbookList, setSortCriterion, setSortCriterionForRequest, setBookingFree } =
    searchSlice.actions;
