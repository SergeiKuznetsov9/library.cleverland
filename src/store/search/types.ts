import { Sorting } from '../../constants/sorting';

type ClientsFilters = {
    all: boolean;
    holders: boolean;
    blocked: boolean;
};

export type ClientsFilterKeys = keyof ClientsFilters;

type BooksFilters = {
    booked: boolean;
    issued: boolean;
};

export type BooksFilterKeys = keyof BooksFilters;

export type BooksFilteringPayload = {
    filterName: BooksFilterKeys;
    filterValue: boolean;
};

export type ClientsFilteringPayload = {
    filterName: ClientsFilterKeys;
    filterValue: boolean;
};

export type SearchParams = {
    filter: string;
    sortCriteria: Sorting[];
    sortCriteriaForRequest: Sorting[];
    bookingFree: boolean;
    clientsFilters: ClientsFilters;
    booksFilters: BooksFilters;
};
