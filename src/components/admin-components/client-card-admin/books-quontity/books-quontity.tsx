import { FC } from 'react';
import classNames from 'classnames';

import { getBooksAmountString } from '../../../../utils/books-amount-string';
import bookIcon from '../assets/book_icon.svg';

import styles from './books-quontity.module.scss';

type BooksQuontityProps = {
    className?: string;
    quontity: number;
};

export const BooksQuontity: FC<BooksQuontityProps> = ({ className, quontity }) => (
    <div className={classNames(className, styles.BooksQuontity)}>
        <img src={bookIcon} alt='bookIcon' />
        {getBooksAmountString(quontity)}
    </div>
);
