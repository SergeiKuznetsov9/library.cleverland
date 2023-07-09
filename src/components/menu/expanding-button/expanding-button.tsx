import { MouseEvent, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { SORTING, Sorting } from '../../../constants/sorting';
import { useAppDispatch } from '../../../store/hooks';
import { setSortCriterion, setSortCriterionForRequest } from '../../../store/search';
import { searchSelector } from '../../../store/search/selectors';
import { Button } from '../../button';
import chevronAsc from '../assets/icon-chevron-asc.svg';
import chevronDesc from '../assets/icon-chevron-desc.svg';
import iconClose from '../assets/icon-close.svg';
import sortAsc from '../assets/sort-asc.svg';
import sortDesc from '../assets/sort-desc.svg';

import styles from './expanding-button.module.scss';

type ExpandingButtonProps = {
    hideOtherControlsForSorting: () => void;
    showOtherControlsForSorting: () => void;
    cssClasses: string;
};

export const ExpandingButton = ({
    hideOtherControlsForSorting,
    showOtherControlsForSorting,
    cssClasses,
}: ExpandingButtonProps) => {
    const dispatch = useAppDispatch();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { sortCriteria } = useSelector(searchSelector);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                menuRef.current?.classList.remove('displayFlex');
                showOtherControlsForSorting();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        menuRef.current?.classList.remove('displayFlex');
        showOtherControlsForSorting();
    };

    const onOpenMenu = () => {
        menuRef.current?.classList.add('displayFlex');
        hideOtherControlsForSorting();
    };

    const onChooseSortCriterion = (event: MouseEvent, sortingCriterion: Sorting) => {
        const filteredCriterias = sortCriteria.filter(
            (criterion) => criterion.title !== sortingCriterion.title,
        );

        filteredCriterias.push(sortingCriterion);
        dispatch(setSortCriterion(filteredCriterias));

        if (sortingCriterion.value !== 'rating') {
            const filteredCriteriasForRequest = sortCriteria.filter(
                (criterion) => criterion.title !== sortingCriterion.title,
            );

            filteredCriteriasForRequest.push(sortingCriterion);
            dispatch(setSortCriterionForRequest(filteredCriteriasForRequest));
        }

        closeMenu(event);
    };

    return (
        <div className={classNames(styles.root, cssClasses)}>
            <Button
                classButton={classNames(styles.buttonSort)}
                dataTestId='sort-rating-button'
                onClick={onOpenMenu}
            >
                <span className={styles.noDisplayOn640}>Сортировка</span>
                <img src={chevronAsc} alt='icon-open' className={styles.noDisplayOn640} />
                <img src={sortDesc} alt='icon-open' className={styles.displayOn640} />
            </Button>

            <div className={classNames(styles.sortingMenu, 'displayNone')} ref={menuRef}>
                <a
                    href=''
                    className={styles.sortingMenuHeader}
                    onClick={(event) => closeMenu(event)}
                >
                    <span>Сортировка</span>
                    <img src={chevronDesc} alt='icon-open' className={styles.noDisplayWhen370} />
                    <img src={iconClose} alt='icon-close' className={styles.displayWhen370} />
                </a>
                <hr className={styles.devider} />
                <ul className={styles.sortingList}>
                    {SORTING.map((sortingCriterion) => (
                        <li key={sortingCriterion.description}>
                            <a
                                href=''
                                onClick={(event) => onChooseSortCriterion(event, sortingCriterion)}
                            >
                                <span>{sortingCriterion.title}</span>
                                <img
                                    src={sortingCriterion.direction === 'asc' ? sortAsc : sortDesc}
                                    alt='icon-sort'
                                />
                            </a>
                            <hr className={styles.smallScreenDevider} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
