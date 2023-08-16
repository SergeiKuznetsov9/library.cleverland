import classNames from 'classnames';

import IconPlugImg from '../../../assets/img/icon-plug-img.svg';
import { Rating } from '../../../components/rating';
import { BookInfo } from '../../../store/clients/types';

import styles from './user-info-book-card.module.scss';

type UserInfoBookCardProps = {
    book?: BookInfo;
    className?: string;
    cardView?: CardView;
};

export enum CardView {
    LIST = 'list',
    CARD = 'card',
}

export const UserInfoBookCard = ({
    book,
    className,
    cardView = CardView.LIST,
}: UserInfoBookCardProps) => {
    const { authors, image, issueYear, rating, title } = book as BookInfo;

    return (
        <div className={classNames(styles[cardView], className)}>
            <div className={styles.imageBlock}>
                <img src={image ? image : IconPlugImg} alt={title} />
            </div>

            <h4 className={styles.title}>{title}</h4>

            <div className={styles.author}>
                {authors.join(', ')}, {issueYear}
            </div>

            <div className={styles.rating}>
                {rating || rating === 0 ? (
                    <Rating
                        rating={rating}
                        classNameStar={styles.star}
                        classNameButton={styles.starButton}
                    />
                ) : (
                    <span className={styles.textNoRaring}>Ещё нет оценок</span>
                )}
            </div>
        </div>
    );
};
