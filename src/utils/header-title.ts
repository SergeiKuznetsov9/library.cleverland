import { HEADER_TITLE, HEADER_TITLE_ADMIN } from '../constants/location';

export const headerTitle = (path: string, role: string) => {
    if (path.includes('all')) return HEADER_TITLE.library;
    if (HEADER_TITLE[path as keyof typeof HEADER_TITLE])
        return HEADER_TITLE[path as keyof typeof HEADER_TITLE];
    if (HEADER_TITLE_ADMIN[path as keyof typeof HEADER_TITLE_ADMIN] && role === 'admin')
        return HEADER_TITLE_ADMIN[path as keyof typeof HEADER_TITLE_ADMIN];

    return '';
};
