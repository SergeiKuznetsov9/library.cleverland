import { useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: HTMLLIElement | null;
}

export function useInfiniteScroll({ callback, triggerRef }: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (callback && triggerRef) {
            const options = {
                root: document,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerRef);
        }

        return () => {
            if (observer.current && triggerRef) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerRef);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback, triggerRef]);
}
