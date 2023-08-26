import { Sorting } from '../../constants/sorting';

type ClientsFilters = {
    all: boolean;
    holders: boolean;
    blocked: boolean;
};

export type ClientsFilterKeys = keyof ClientsFilters;

export type BooksFiltersType = {
    isBooked: boolean;
    isIssued: boolean;
};

export type BooksFilterKeys = keyof BooksFiltersType;

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
    booksFilters: BooksFiltersType;
    isBooksOrderAsc: boolean;
};
