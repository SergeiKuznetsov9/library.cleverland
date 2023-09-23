import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting } from '../../constants/sorting';

import { BooksFiltersType, ClientsFilters, SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    sortCriteria: [],
    sortCriteriaForRequest: [],
    bookingFree: false,
    clientsFilters: {
        all: true,
        holders: false,
        blocked: false,
    },
    booksFilters: {
        isBooked: false,
        isIssued: false,
    },
    isBooksOrderAsc: true,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchBookList: (state, action: PayloadAction<string | undefined>) => {
            state.filter = action.payload || '';
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
        setClientsFilter: (state, action: PayloadAction<ClientsFilters>) => {
            state.clientsFilters = action.payload;
        },
        setBooksFilter: (state, action: PayloadAction<BooksFiltersType>) => {
            state.booksFilters = action.payload;
        },
        setBooksOrderAsc: (state, action: PayloadAction<boolean>) => {
            state.isBooksOrderAsc = action.payload;
        },
    },
});

export const {
    searchBookList,
    setSortCriterion,
    setSortCriterionForRequest,
    setBookingFree,
    setClientsFilter,
    setBooksFilter,
    setBooksOrderAsc,
} = searchSlice.actions;
