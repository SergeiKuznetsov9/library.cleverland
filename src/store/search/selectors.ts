import { RootState } from '..';

export const searchSelector = (state: RootState) => state.search;
export const clientsFilterStatusSelector = (state: RootState) => state.search.clientsFilters;
export const booksFilterStatusSelector = (state: RootState) => state.search.booksFilters;
