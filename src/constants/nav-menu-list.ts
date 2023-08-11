export type NavMenuListType = {
    name: string;
    category: string;
    id: number;
};

export const NAV_MENU_MAIN = {
    books: {
        name: 'Витрина книг',
        path: 'books',
    },
    terms: {
        name: 'Правила пользования',
        path: 'terms',
    },
    contract: {
        name: 'Договор оферты',
        path: 'contract',
    },
    profile: {
        name: 'Профиль',
        path: 'profile',
    },
    admin: {
        name: 'Администрирование',
        path: 'admin',
    },
    exit: {
        name: 'Выход',
        path: 'auth',
    },
};

export const NAV_MENU_ALL = {
    name: 'Все книги',
    category: 'all',
    id: 0,
};
