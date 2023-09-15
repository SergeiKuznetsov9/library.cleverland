export type IssuesType = {
    issue: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
    };
    return: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
    };
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

export type DeliveryModel = {
    dateHandedFrom: string;
    dateHandedTo: string;
    handed: true;
    id: number;
    recipientFirstName: string;
    recipientId: number;
    recipientLastName: string;
};
