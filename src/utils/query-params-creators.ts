import { Sorting } from '../constants/sorting';

export const createSortCriteriaQueryParams = (sortCriteria: Sorting[]) =>
    sortCriteria.reduce(
        (accum, criterion, index) =>
            `${accum}&sort[${index}]=${criterion.value}%3A${criterion.direction}`,
        '',
    );
