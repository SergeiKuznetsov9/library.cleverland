import { Sorting } from '../../constants/sorting';

export type SearchParams = {
    filter: string;
    sortCriteria: Sorting[];
    sortCriteriaForRequest: Sorting[];
    bookingFree: boolean;
};
