import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    DefaultValuesType,
    UpdateCommentPayloadType,
} from '../../components/modal-rate-book/modal-rate-book';
import { DeliveryModel } from '../issues/types';

import {
    BookCategoriesDataType,
    BookDataType,
    BookingModalPayload,
    BookingPayload,
    BookingResponseSuccess,
    BookingUpdatePayload,
    BookListItem,
    BookListPaginationPayload,
    BooksType,
    Delivery,
    NewIssueAtributes,
} from './types';

export const initialState: BooksType = {
    bookList: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        isAllDownloaded: false,
    },
    book: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
    bookCategories: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
    booking: {
        id: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isOpenBookingModal: false,
        data: null,
        bookId: null,
        isEdit: false,
        bookingDate: null,
        message: null,
        isOnBookInfoPage: undefined,
    },
    bookReview: {
        bookId: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isOpenReviewModal: false,
        data: null,
        message: null,
        userId: undefined,
    },
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        bookListRequest: (state) => {
            state.bookList.isLoading = true;
            state.bookList.isError = false;
            state.bookList.isSuccess = false;
        },
        bookListRequestAllDownloaded: (state, action: PayloadAction<boolean>) => {
            state.bookList.isAllDownloaded = action.payload;
        },
        bookListRequestWithPagination: (
            state,
            action: PayloadAction<BookListPaginationPayload>,
        ) => {
            state.bookList.isLoading = true;
            state.bookList.isError = false;
            state.bookList.isSuccess = false;
        },
        bookListRequestSuccess: (state, action: PayloadAction<BookListItem[]>) => {
            state.bookList.isLoading = false;
            state.bookList.isError = false;
            state.bookList.isSuccess = true;
            state.bookList.data = action.payload;
        },
        bookListRequestWithPaginationSuccess: (state, action: PayloadAction<BookListItem[]>) => {
            state.bookList.isLoading = false;
            state.bookList.isError = false;
            state.bookList.isSuccess = true;
            state.bookList.data = state.bookList.data
                ? [...state.bookList.data, ...action.payload]
                : action.payload;
        },
        bookListRequestFailure: (state) => {
            state.bookList.isLoading = false;
            state.bookList.isError = true;
            state.bookList.isSuccess = false;
            state.bookList.data = null;
        },
        bookListRequestClean: (state) => {
            state.bookList.data = null;
        },
        bookListSetData: (state, action: PayloadAction<BookListItem[]>) => {
            state.bookList.data = action.payload;
        },
        bookRequest: (state, action: PayloadAction<string | number>) => {
            state.book.isLoading = true;
            state.book.isError = false;
            state.book.isSuccess = false;
        },
        bookRequestSuccess: (state, action: PayloadAction<BookDataType>) => {
            state.book.isLoading = false;
            state.book.isError = false;
            state.book.isSuccess = true;
            state.book.data = action.payload;
        },
        bookRequestFailure: (state) => {
            state.book.isLoading = false;
            state.book.isError = true;
            state.book.isSuccess = false;
            state.book.data = null;
        },
        resetBookData: (state) => {
            state.book.data = null;
        },

        bookCategoriesRequest: (state) => {
            state.bookCategories.isLoading = true;
            state.bookCategories.isError = false;
            state.bookCategories.isSuccess = false;
        },
        bookCategoriesSuccess: (state, action: PayloadAction<BookCategoriesDataType>) => {
            state.bookCategories.isLoading = false;
            state.bookCategories.isError = false;
            state.bookCategories.isSuccess = true;
            state.bookCategories.data = action.payload;
        },
        bookCategoriesFailure: (state) => {
            state.bookCategories.isLoading = false;
            state.bookCategories.isError = true;
            state.bookCategories.isSuccess = false;
            state.bookCategories.data = null;
        },
        toggleBookingModal: (state, { payload }: PayloadAction<BookingModalPayload>) => {
            state.booking.isOpenBookingModal = payload.showModal;
            state.booking.bookId = payload.bookId;
            state.booking.isEdit = payload.isEdit || false;
            state.booking.id = payload.bookingId || null;
            state.booking.bookingDate = payload.bookingDate || null;
            state.booking.isOnBookInfoPage = payload.isOnBookInfoPage;
        },
        bookingRequest: (state, { payload }: PayloadAction<BookingPayload>) => {
            state.booking.isLoading = true;
            state.booking.isError = false;
            state.booking.isSuccess = false;
        },
        bookingUpdateRequest: (state, { payload }: PayloadAction<BookingUpdatePayload>) => {
            state.booking.isLoading = true;
            state.booking.isError = false;
            state.booking.isSuccess = false;
        },
        bookingDeleteRequest: (state, action: PayloadAction<BooksType['booking']['id']>) => {
            state.booking.isLoading = true;
            state.booking.isError = false;
            state.booking.isSuccess = false;
        },
        bookingRequestSuccess: (
            state,
            { payload }: PayloadAction<{ data: BookingResponseSuccess; message: string | null }>,
        ) => {
            state.booking.data = payload.data;
            state.booking.isLoading = false;
            state.booking.isSuccess = true;
            state.booking.isOpenBookingModal = false;
            state.booking.message = payload.message;
        },
        bookingRequestFailure: (state, action: PayloadAction<string | null>) => {
            state.booking.isLoading = false;
            state.booking.isError = true;
            state.booking.isSuccess = false;
            state.booking.data = null;
            state.booking.isOpenBookingModal = false;
            state.booking.message = action.payload;
        },
        bookingReset: (state) => {
            state.booking.id = null;
            state.booking.isLoading = false;
            state.booking.isSuccess = false;
            state.booking.isError = false;
            state.booking.data = null;
            state.booking.bookId = null;
            state.booking.isEdit = false;
            state.booking.bookingDate = null;
            state.booking.message = null;
        },
        bookReviewRequest: (state, action: PayloadAction<DefaultValuesType>) => {
            state.bookReview.isLoading = true;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = false;
            state.bookReview.message = null;
        },
        bookReviewRequestSuccess: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = true;
            state.bookReview.message = payload.message;
            state.bookReview.data = payload.data;
            state.bookReview.isOpenReviewModal = false;
        },
        bookReviewRequestFailure: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = true;
            state.bookReview.isSuccess = false;
            state.bookReview.message = payload.message;
            state.bookReview.data = null;
            state.bookReview.isOpenReviewModal = false;
        },
        bookReviewUpdateRequest: (state, action: PayloadAction<UpdateCommentPayloadType>) => {
            state.bookReview.isLoading = true;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = false;
            state.bookReview.message = null;
        },
        bookReviewUpdateSuccess: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = true;
            state.bookReview.message = payload.message;
            state.bookReview.data = payload.data;
            state.bookReview.isOpenReviewModal = false;
        },
        bookReviewUpdateFailure: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = true;
            state.bookReview.isSuccess = false;
            state.bookReview.message = payload.message;
            state.bookReview.data = null;
            state.bookReview.isOpenReviewModal = false;
        },
        toggleBookReviewModal: (
            state,
            {
                payload,
            }: PayloadAction<{ bookId: string | number | null; isOpen: boolean; userId?: number }>,
        ) => {
            state.bookReview.isOpenReviewModal = payload.isOpen;
            state.bookReview.bookId = payload.bookId;
            state.bookReview.userId = payload.userId;
        },
        alertsReset: (state) => {
            state.booking.message = null;
            state.bookReview.message = null;
            state.booking.isSuccess = false;
            state.booking.isError = false;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = false;
        },
        addDeliveryStateToBook: (
            state,
            action: PayloadAction<{ deliveryModel: DeliveryModel; bookId: number }>,
        ) => {
            const newBooksArray = state.bookList.data?.map((book) => {
                if (book.id === action.payload.bookId) {
                    return { ...book, delivery: action.payload.deliveryModel, booking: null };
                }

                return book;
            });

            state.bookList.data = newBooksArray || [];
        },
        removeDeliveryStateFromBook: (state, action: PayloadAction<number>) => {
            const newBooksArray = state.bookList.data?.map((book) => {
                if (book.id === action.payload) {
                    return { ...book, delivery: null };
                }

                return book;
            });

            state.bookList.data = newBooksArray ?? [];
        },
        removeIssuedBook: (state, action: PayloadAction<number>) => {
            const newBooksArray = state.bookList.data?.filter((book) => book.id !== action.payload);

            state.bookList.data = newBooksArray ?? [];
        },
        changeIssueAtributes: (state, action: PayloadAction<NewIssueAtributes>) => {
            const { dateHandedTo, bookId } = action.payload;
            const newBooksArray = state.bookList.data?.map((book) => {
                if (book.id === bookId) {
                    return { ...book, delivery: { ...(book.delivery as Delivery), dateHandedTo } };
                }

                return book;
            });

            state.bookList.data = newBooksArray ?? [];
        },
    },
});

export const {
    bookListRequest,
    bookListRequestSuccess,
    bookListRequestFailure,
    bookListRequestWithPagination,
    bookListRequestWithPaginationSuccess,
    bookListRequestAllDownloaded,
    bookListRequestClean,
    bookRequest,
    bookRequestSuccess,
    bookRequestFailure,
    resetBookData,
    bookCategoriesRequest,
    bookCategoriesSuccess,
    bookCategoriesFailure,
    toggleBookingModal,
    bookingRequest,
    bookingRequestSuccess,
    bookingRequestFailure,
    bookListSetData,
    bookingUpdateRequest,
    bookingDeleteRequest,
    bookingReset,
    bookReviewRequestSuccess,
    bookReviewRequestFailure,
    bookReviewRequest,
    toggleBookReviewModal,
    alertsReset,
    bookReviewUpdateRequest,
    bookReviewUpdateSuccess,
    bookReviewUpdateFailure,
    addDeliveryStateToBook,
    removeDeliveryStateFromBook,
    removeIssuedBook,
} = booksSlice.actions;
