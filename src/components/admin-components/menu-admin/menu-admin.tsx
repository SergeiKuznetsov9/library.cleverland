import { FC, useRef } from 'react';
import classNames from 'classnames';

import { SearchingInput } from './searching-input/searching-input';
import { SortingButton } from './sorting-button/sorting-button';

import styles from './menu-admin.module.scss';

type MenuAdminProps = {
    className?: string;
    handleSearchInput: (value: string) => void;
    handleSortDirection: (value: boolean) => void;
};

export const MenuAdmin: FC<MenuAdminProps> = ({
    className,
    handleSearchInput,
    handleSortDirection,
}) => {
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

    const handleSorting = (sortingStatus: boolean) => {
        handleSortDirection(sortingStatus);
    };

    return (
        <div className={classNames(styles.SearchingBar, className)}>
            <SearchingInput
                hideSorting={hideSorting}
                showSorting={showSorting}
                handleInput={handleInput}
            />
            <div ref={sortingButton}>
                <SortingButton handleSorting={handleSorting} />
            </div>
        </div>
    );
};
