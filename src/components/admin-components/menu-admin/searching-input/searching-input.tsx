import React, { FC, useRef, useState } from 'react';
import classNames from 'classnames';

import { Button } from '../../../button';
import iconClose from '../assets/icon-close.svg';
import iconSearch from '../assets/icon-search.svg';
import iconSearchColor from '../assets/icon-search-color.svg';

import styles from './searching-input.module.scss';

type SearchProps = {
    searchValue?: string;
    hideSorting: () => void;
    showSorting: () => void;
    handleInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchingInput: FC<SearchProps> = ({
    hideSorting,
    showSorting,
    handleInput,
    searchValue,
}) => {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    const onOpenSearching = () => {
        inputContainerRef.current?.classList.remove('displayNoneOn584');
        setIsSearchExpanded(true);
        hideSorting();
    };

    const onCloseSearching = () => {
        inputContainerRef.current?.classList.add('displayNoneOn584');
        setIsSearchExpanded(false);
        showSorting();
    };

    return (
        <React.Fragment>
            {!isSearchExpanded && (
                <Button
                    view='filter'
                    classButton={classNames(styles.mobileButton)}
                    onClick={onOpenSearching}
                >
                    <img src={iconSearch} alt='close' />
                </Button>
            )}
            <div
                className={classNames(styles.container, 'displayNoneOn584')}
                ref={inputContainerRef}
            >
                <input
                    className={styles.input}
                    placeholder='Поиск книги или автора…'
                    onChange={handleInput}
                    value={searchValue}
                />
                <img src={iconSearch} alt='close' className={styles.iconSearch} />
                <img src={iconSearchColor} alt='close' className={styles.iconSearchColor} />
                <Button classButton={styles.closeButton} onClick={onCloseSearching}>
                    <img src={iconClose} alt='close' />
                </Button>
            </div>
        </React.Fragment>
    );
};
