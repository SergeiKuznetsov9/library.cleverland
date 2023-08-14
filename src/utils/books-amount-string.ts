export const getBooksAmountString = (number: number): string => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    const bookSuffix =
        lastTwoDigits >= 11 && lastTwoDigits <= 19
            ? 'книг'
            : lastDigit === 1
            ? 'книга'
            : lastDigit >= 2 && lastDigit <= 4
            ? 'книги'
            : 'книг';

    return `${number} ${bookSuffix}`;
};
