import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { getBookList } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setBookingFree } from '../../store/search';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Search } from '../search';

import displayList from './assets/icon-line.svg';
import displayWindow from './assets/icon-square.svg';
import { ExpandingButton } from './expanding-button';

import styles from './menu.module.scss';

export type MenyProps = {
    menuView: MenuViewEnum;
    setMenuView: (onChangeText: MenuViewEnum) => void;
};

export const Menu = ({ menuView, setMenuView }: MenyProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [cssClassesForSorting, setCssClassesForSorting] = useState('');
    const [cssClassesForSearching, setCssClassesForSearching] = useState('');
    const bookingViewElems = useRef<HTMLDivElement | null>(null);
    const bookList = useAppSelector(getBookList);
    const dispatch = useAppDispatch();

    const handleCheckboxChange = () => {
        dispatch(setBookingFree(!isChecked));
        setIsChecked(!isChecked);
    };

    const hideOtherControlsForSorting = () => {
        bookingViewElems.current?.classList.add('noDisplayOn640');
        setCssClassesForSorting('noDisplayOn370');
    };

    const showOtherControlsForSorting = () => {
        bookingViewElems.current?.classList.remove('noDisplayOn640');
        setCssClassesForSorting('');
    };

    const hideOtherControlsForSearching = () => {
        setCssClassesForSearching('noDisplayOn550');
        bookingViewElems.current?.classList.add('noDisplayOn550');
    };

    const showOtherControlsForSearching = () => {
        setCssClassesForSearching('');
        bookingViewElems.current?.classList.remove('noDisplayOn550');
    };

    return (
        <div className={classNames(styles.menu)}>
            {bookList && (
                <React.Fragment>
                    <div className={classNames(styles.searchSortBlock)}>
                        <Search
                            cssClasses={cssClassesForSorting}
                            hideOtherControlsForSearching={hideOtherControlsForSearching}
                            showOtherControlsForSearching={showOtherControlsForSearching}
                        />
                        <ExpandingButton
                            hideOtherControlsForSorting={hideOtherControlsForSorting}
                            showOtherControlsForSorting={showOtherControlsForSorting}
                            cssClasses={cssClassesForSearching}
                        />
                    </div>

                    <div ref={bookingViewElems} className={classNames(styles.display)}>
                        <Checkbox
                            status={isChecked}
                            onToggle={handleCheckboxChange}
                            label='Скрыть бронь'
                        />
                        <Button
                            classButton={styles.buttonDisplay}
                            onClick={() => {
                                setMenuView(
                                    menuView === MenuViewEnum.list
                                        ? MenuViewEnum.window
                                        : MenuViewEnum.list,
                                );
                            }}
                            dataTestId='button-menu-view-list'
                        >
                            <img
                                src={menuView === MenuViewEnum.list ? displayWindow : displayList}
                                alt='icon-view'
                            />
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
