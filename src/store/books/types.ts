import { Comment } from '../user/types';

export type BooksType = {
    bookList: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookListItem[];
        isAllDownloaded: boolean;
    };
    book: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookDataType;
    };
    bookCategories: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookCategoriesDataType;
    };
    booking: {
        id: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        isOpenBookingModal: boolean;
        data: BookingResponseSuccess | null;
        bookId: null | string | number;
        isEdit: boolean;
        bookingDate: null | string;
        message: string | null;
        isOnBookInfoPage?: boolean;
    };
    bookReview: {
        bookId: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        isOpenReviewModal: boolean;
        data: BookRateSuccess | null;
        message: string | null;
        userId?: number;
    };
};

export type Booking = {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
};

export type Delivery = {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName?: string;
    recipientLastName?: string;
};

export type BookListItem = {
    issueYear: string;
    rating: number;
    title: string;
    authors: string[];
    image: {
        url: string;
    };
    categories: string[];
    id: number;
    booking: Booking;
    delivery: Delivery;
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookListPaginationPayload = {
    pageNumber: number;
    category?: string;
    sortingCriteria?: {
        'sort[0]'?: string;
        'sort[1]'?: string;
        'sort[2]'?: string;
    };
    isBooked?: boolean;
    isIssued?: boolean;
    isBooksOrderAsc?: boolean;
};

export type GetBooksQueryParams = {
    'pagination[page]': string;
    'pagination[pageSize]': string;
    'filters[categories][path][$eq]'?: string;
    'filters[booking][id][$notNull]'?: string;
    'filters[delivery][id][$notNull]'?: string;
    'sort[0]'?: string;
    'sort[1]'?: string;
    'sort[2]'?: string;
    sort?: string;
};

export type BookDataType = {
    id: number;
    title: string;
    rating: number;
    issueYear: string;
    description: string;
    publish: string;
    pages: string;
    cover: string;
    weight: string;
    format: string;
    ISBN: string;
    producer: string;
    authors: string[];
    images: [
        {
            url: string;
        },
    ];
    categories: string[];
    comments: Comment[];

    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookCategoriesItem = {
    name: string;
    path: string;
    id: number;
    booksCount: number;
};

export type BookingModalPayload = {
    showModal: boolean;
    bookId: string | null | number;
    isEdit?: boolean;
    bookingId?: string | null | number;
    bookingDate?: string | null;
    isOnBookInfoPage?: boolean;
};

export type BookCategoriesDataType = BookCategoriesItem[];

export type BookingResponseSuccess = {
    id: number | string;
    attributes: {
        order: true;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        dateOrder: string;
    };
};

export type BookingPayload = { dateOrder: string | Date; bookId: string | number | null };

export type BookingUpdatePayload = BookingPayload & { bookingId: string | number | null };

export type BookRateSuccess = {
    id: number | string;
    attributes: {
        rating: number | string;
        text: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};
