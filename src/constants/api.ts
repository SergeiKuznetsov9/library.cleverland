export const HOST = 'https://library-cleverland-2jfze.ondigitalocean.app';
export const BASE_URL = `${HOST}/api`;
export const BASE_AUTH_URL = `${BASE_URL}/auth`;

export const BOOKS_URL = {
    list: `${BASE_URL}/books`,
    item: `${BASE_URL}/books`,
    categories: `${BASE_URL}/categories`,
    booking: `${BASE_URL}/bookings`,
    comment: `${BASE_URL}/comments`,
};

export const AUTH_URL = {
    login: `${BASE_AUTH_URL}/local`,
    register: `${BASE_AUTH_URL}/local/register`,
    recovery: `${BASE_AUTH_URL}/forgot-password`,
    reset: `${BASE_AUTH_URL}/reset-password`,
};

export const FILE_UPLOAD = {
    upload: `${BASE_URL}/upload`,
};

export const PAGINATION = {
    page: 'pagination[page]=',
    pageSize: 'pagination[pageSize]=',
};

export const FILTERS = {
    categories: '&filters[categories][path][$eq]=',
    searchingByTitle: '&filters[title][$containsi]=',
};

export const CLIENTS_URL = {
    clients: `${BASE_URL}/users`,
    permissions: `${BASE_URL}/users-permissions`,
};

export const ISSUE_URL = {
    issue: `${BASE_URL}/deliveries`,
};
