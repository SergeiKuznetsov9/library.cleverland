import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { NavigationAdmin } from '../admin-components/navigation-admin';
import { ButtonMenuBurger } from '../button-menu-burger';
import { HeaderUserPopup } from '../header-user';
import { Navigation } from '../navigation';

import styles from './burger-menu.module.scss';

export const BurgerMenu = () => {
    const [isButtonState, setButtonState] = useState(false);

    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (
                isButtonState &&
                dropDownRef.current &&
                !dropDownRef.current.contains(e.target as Node)
            ) {
                setButtonState?.(!isButtonState);

                e.preventDefault();
                e.stopPropagation();
            }
        };

        document.addEventListener('click', checkIfClickedOutside, true);

        return () => document.removeEventListener('click', checkIfClickedOutside, true);
    }, [isButtonState]);

    useEffect(() => {
        const bodyStyle = document.body.style;

        if (isButtonState) {
            bodyStyle.position = 'fixed';
        } else {
            bodyStyle.position = 'static';
            bodyStyle.overflowY = 'scroll';
        }
    });

    const { pathname } = useLocation(); // TODO CustomHook, проверку роли
    const [isAdminNav, setIsAdminNav] = useState(pathname.includes('admin'));

    useEffect(() => {
        if (pathname.includes('admin')) {
            setIsAdminNav(true);
        } else {
            setIsAdminNav(false);
        }
    }, [pathname]);

    return (
        <div className={styles.burgerMenu}>
            <ButtonMenuBurger isButtonState={isButtonState} setButtonState={setButtonState} />
            <div
                className={classNames(
                    styles.burgerMenuNav,
                    isButtonState && styles.burgerMenuNavActive,
                )}
                ref={dropDownRef}
                data-test-id='burger-navigation'
            >
                {isAdminNav ? (
                    <NavigationAdmin onClickItemMenu={() => setButtonState(false)} />
                ) : (
                    <Navigation
                        setButtonState={setButtonState}
                        burgerMenuNavigation={true}
                        dataTestid='burger'
                    />
                )}
                <hr className={styles.devider} />
                <HeaderUserPopup onClickItemMenu={() => setButtonState(false)} />
            </div>
        </div>
    );
};
