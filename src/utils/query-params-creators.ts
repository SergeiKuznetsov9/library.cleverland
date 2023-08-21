import { BOOKS_LIST } from '../constants/books-list';
import { NAV_MENU_ALL } from '../constants/nav-menu-list';
import { Sorting } from '../constants/sorting';
import { BookListPaginationPayload, GetBooksQueryParams } from '../store/books/types';

export const createSortCriteriaQueryParams = (sortCriteria: Sorting[]) =>
    sortCriteria.reduce((accum: any, criterion, index) => {
        const newObjParams = { ...accum };

        newObjParams[`sort[${index}]`] = `${criterion.value}%3A${criterion.direction}`;

        return newObjParams;
    }, {});

export const createQueryParamsForGetBooks = (
    payload: BookListPaginationPayload,
): GetBooksQueryParams => {
    const queryParams: GetBooksQueryParams = {
        'pagination[page]': String(payload.pageNumber),
        'pagination[pageSize]': String(BOOKS_LIST.pageSize),
        ...payload.sortingCriteria,
    };

    if (payload.category && payload.category !== NAV_MENU_ALL.category) {
        queryParams['filters[categories][path][$eq]'] = payload.category;
    }

    if (payload.isBooked) {
        queryParams['filters[booking][id][$notNull]'] = 'true';
    }

    if (payload.isIssued) {
        queryParams['filters[delivery][id][$notNull]'] = 'true';
    }

    if ('isBooksOrderAsc' in payload) {
        queryParams.sort = `title:${payload.isBooksOrderAsc ? 'asc' : 'desc'}`;
    }

    return queryParams;
};
