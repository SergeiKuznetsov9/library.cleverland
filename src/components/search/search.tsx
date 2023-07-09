import { useRef, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../store/hooks';
import { searchbookList } from '../../store/search';
import { Button } from '../button';

import iconClose from './assets/icon-close.svg';
import iconSearch from './assets/icon-search.svg';
import iconSearchColor from './assets/icon-search-color.svg';

import styles from './search.module.scss';

type SearchProps = {
    cssClasses: string;
    hideOtherControlsForSearching: () => void;
    showOtherControlsForSearching: () => void;
};

export const Search = ({
    cssClasses,
    hideOtherControlsForSearching,
    showOtherControlsForSearching,
}: SearchProps) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [fullWidth, setFullWidth] = useState('');
    const [hideButton, setHideButton] = useState('');
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value.trimStart());
        dispatch(searchbookList(target.value.trimStart().toLowerCase()));
    };

    const onOpenInput = () => {
        inputContainerRef.current?.classList.add('displayBlock');
        hideOtherControlsForSearching();
        setHideButton('displayNone');
        setFullWidth('fullWidthOn550');
    };

    const onCloseInput = () => {
        inputContainerRef.current?.classList.remove('displayBlock');
        showOtherControlsForSearching();
        setHideButton('');
        setFullWidth('');
    };

    return (
        <div className={classNames(styles.search, cssClasses, fullWidth)}>
            <Button
                classButton={classNames(styles.openSearchingButton, hideButton)}
                onClick={onOpenInput}
                dataTestId='button-search-open'
            >
                <img src={iconSearch} alt='icon-search' />
            </Button>
            <div className={styles.inputContainer} ref={inputContainerRef}>
                <input
                    className={classNames(styles.input)}
                    placeholder='Поиск книги или автора…'
                    value={value}
                    onChange={handleChange}
                    data-test-id='input-search'
                />
                <img src={iconSearch} alt='icon-search' className={styles.iconSearch} />
                <img src={iconSearchColor} alt='icon-search' className={styles.iconSearchColor} />
                <Button
                    classButton={classNames(styles.closeButton)}
                    onClick={onCloseInput}
                    dataTestId='button-search-close'
                >
                    <img src={iconClose} alt='icon-close' />
                </Button>
            </div>
        </div>
    );
};
