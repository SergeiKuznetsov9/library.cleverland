export const formatDate = (stringDate: string) =>
    `${stringDate.slice(8, 10)}.${stringDate.slice(5, 7)}`;

export const formatDateToDDMMYYYY = (stringDate: string): string => {
    const dateObject = new Date(stringDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1; // Месяцы в объекте Date нумеруются с 0, поэтому добавляем 1
    const year = dateObject.getUTCFullYear();

    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
};
