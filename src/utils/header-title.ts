import { HEADER_TITLE } from '../constants/location';

export const headerTitle = (path: string) => {
    if (path.includes('all')) return HEADER_TITLE.library;
    if (HEADER_TITLE[path as keyof typeof HEADER_TITLE])
        return HEADER_TITLE[path as keyof typeof HEADER_TITLE];

    return '';
};
