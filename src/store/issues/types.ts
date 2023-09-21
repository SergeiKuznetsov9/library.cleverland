type DownloadingStatus = {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

export type IssuesType = {
    issue: DownloadingStatus;
    return: DownloadingStatus;
    prolongation: DownloadingStatus;
};

export type IssuePayload = {
    data: {
        handed: boolean;
        book: number;
        recipient: number;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientFirstName?: string;
        recipientLastName?: string;
        isBooked?: boolean;
    };
};

export type ReturnPayload = {
    isIssued: boolean;
    deliveryId: number;
    bookId: number;
    recipientId: number;
};

export type ProlongationPayload = {
    deliveryId: number;
    book: number;
};

export type DeliveryModel = {
    dateHandedFrom: string;
    dateHandedTo: string;
    handed: true;
    id: number;
    recipientFirstName: string;
    recipientId: number;
    recipientLastName: string;
};
