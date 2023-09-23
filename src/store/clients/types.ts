export type ClientsType = {
    clientsList: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | ClientsListItem[];
        isAllDownloaded: boolean;
    };
    client: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | ClientData;
    };
    clientBlock: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
    };
    clientUnblock: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
    };
};

export type ClientDelivery = {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    book?: BookInfo;
};

export type ClientsListItem = {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: {
        id: number;
        name: string;
        description: string;
        type: string;
    };
    avatar: string;
    delivery: ClientDelivery;
    historyCount: number;
};

export type CommentInfo = {
    id: number;
    rating: number;
    text: string | null;
    bookId: number;
};

export type BookInfo = {
    id: number;
    title: string;
    rating: number;
    issueYear: string;
    authors: string[];
    image: null | string;
};

export type ClientBooking = {
    id: number;
    order: boolean;
    dateOrder: string;
    book: BookInfo;
};

export type HistoryInfo = {
    id: number;
    books: BookInfo[];
};

export type ClientData = {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: {
        id: number;
        name: string;
        description: string;
        type: string;
    };
    comments: CommentInfo[];
    avatar: string;
    booking: ClientBooking;
    delivery: ClientDelivery;
    history: HistoryInfo;
};
