export enum AdminParagraphs {
    BOOKS = 'books',
    USERS = 'users',
}

export enum BooksFilters {
    UNSET = 'unset',
    IS_BOOKED = 'isBooked',
    IS_ISSUED = 'isIssued',
}

export enum UsersFilters {
    UNSET = 'unset',
    ALL = 'all',
    HOLDERS = 'holders',
    BLOCKED = 'blocked',
}

type NavigationItemsType = {
    books: NavigationItemBooks;
    users: NavigationItemUsers;
};

type NavigationItemBooks = {
    to: string;
    labelItem: string;
    checkBoxes: {
        booked: string;
        issued: string;
    };
};

type NavigationItemUsers = {
    to: string;
    labelItem: string;
    checkBoxes: {
        all: string;
        holders: string;
        blocked: string;
    };
};

export const NavigationItems: NavigationItemsType = {
    books: {
        to: '/admin/books',
        labelItem: 'Книги для брони',
        checkBoxes: {
            booked: 'Забронирована',
            issued: 'Выдана',
        },
    },
    users: {
        to: '/admin/users',
        labelItem: 'Пользователи',
        checkBoxes: {
            all: 'Все',
            holders: 'Держатели книг',
            blocked: 'Заблокированные',
        },
    },
};
