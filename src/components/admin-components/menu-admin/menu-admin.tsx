import { FC, useRef, useState } from 'react';
import classNames from 'classnames';

import { bookListRequestClean } from '../../../store/books';
import { useAppDispatch } from '../../../store/hooks';

import { SearchingInput } from './searching-input/searching-input';
import { SortingButton } from './sorting-button/sorting-button';

import styles from './menu-admin.module.scss';

type MenuAdminProps = {
    className?: string;
    searchValue?: string;
    searchingInputPlaceholder?: string;
    handleSearchInput: (value: string) => void;
    handleSortDirection: (value: boolean) => void;
};

export const MenuAdmin: FC<MenuAdminProps> = ({
    className,
    handleSearchInput,
    handleSortDirection,
    searchValue,
    searchingInputPlaceholder,
}) => {
    const dispatch = useAppDispatch();
    const [isAscSorting, setIsAscSorting] = useState(true);
    const sortingButton = useRef<HTMLDivElement | null>(null);

    const hideSorting = () => {
        sortingButton.current?.classList.add('displayNoneOn584');
    };

    const showSorting = () => {
        sortingButton.current?.classList.remove('displayNoneOn584');
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchInput(event.target.value);
    };

    const handleSorting = () => {
        dispatch(bookListRequestClean());
        handleSortDirection(!isAscSorting);
        setIsAscSorting((current) => !current);
    };

    return (
        <div className={classNames(styles.SearchingBar, className)}>
            <SearchingInput
                hideSorting={hideSorting}
                showSorting={showSorting}
                handleInput={handleInput}
                searchValue={searchValue}
                searchingInputPlaceholder={searchingInputPlaceholder}
            />
            <div ref={sortingButton}>
                <SortingButton handleSorting={handleSorting} isAscSorting={isAscSorting} />
            </div>
        </div>
    );
};
