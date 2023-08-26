import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting } from '../../constants/sorting';

import { BooksFiltersType, ClientsFilteringPayload, SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    sortCriteria: [],
    sortCriteriaForRequest: [],
    bookingFree: false,
    clientsFilters: {
        all: false,
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
        setClientsFilter: (state, action: PayloadAction<ClientsFilteringPayload>) => {
            state.clientsFilters[action.payload.filterName] = action.payload.filterValue;
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
    searchbookList,
    setSortCriterion,
    setSortCriterionForRequest,
    setBookingFree,
    setClientsFilter,
    setBooksFilter,
    setBooksOrderAsc,
} = searchSlice.actions;
