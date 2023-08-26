export const formatDate = (stringDate: string) =>
    `${stringDate.slice(8, 10)}.${stringDate.slice(5, 7)}`;

export const formatDateToDDMMYYYY = (stringDate: string): string => {
    const dateObject = new Date(stringDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();

    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
};

export const formatDateToDDMM = (stringDate: string): string => {
    const dateObject = new Date(stringDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;

    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}`;
};

export const isDatePass = (stringDate: string): boolean => {
    const inputDate = new Date(stringDate);
    const currentDate = new Date();

    return inputDate < currentDate;
};
