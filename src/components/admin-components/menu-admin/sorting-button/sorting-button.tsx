import React, { FC, useState } from 'react';

import { Button } from '../../../button';
import sortAsc from '../assets/sort-asc.svg';
import sortDesc from '../assets/sort-desc.svg';

import styles from './sorting-button.module.scss';

type SortingButtonProps = {
    className?: string;
    isAscSorting: boolean;
    handleSorting: () => void;
};

export const SortingButton: FC<SortingButtonProps> = ({
    className,
    isAscSorting,
    handleSorting,
}: SortingButtonProps) => (
    <Button view='filter' classButton={styles.SortingButton} onClick={handleSorting}>
        <div className={styles.label}>
            {isAscSorting ? (
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
