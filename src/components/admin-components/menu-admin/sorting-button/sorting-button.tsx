import React, { FC, useState } from 'react';

import { Button } from '../../../button';
import sortAsc from '../assets/sort-asc.svg';
import sortDesc from '../assets/sort-desc.svg';

import styles from './sorting-button.module.scss';

type SortingButtonProps = {
    className?: string;
    handleSorting: (value: boolean) => void;
};

export const SortingButton: FC<SortingButtonProps> = ({
    className,
    handleSorting,
}: SortingButtonProps) => {
    const [ascSort, setAscSort] = useState(true);

    const handleClick = () => {
        setAscSort((sortDirection) => {
            handleSorting(!sortDirection);

            return !sortDirection;
        });
    };

    return (
        <Button view='filter' classButton={styles.SortingButton} onClick={handleClick}>
            <div className={styles.label}>
                {ascSort ? (
                    <React.Fragment>
                        <span className={styles.labelText}>Сортировка от А до Я</span>
                        <img src={sortAsc} alt='direct_asc' />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <span className={styles.labelText}>Сортировка от Я до А</span>
                        <img src={sortDesc} alt='direct_desc' />
                    </React.Fragment>
                )}
            </div>
        </Button>
    );
};
