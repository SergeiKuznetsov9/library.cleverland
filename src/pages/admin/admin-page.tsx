import { useParams } from 'react-router-dom';

import { BooksListAdmin } from '../../components/admin-components/books-list-admin';
import { UsersListAdmin } from '../../components/admin-components/users-list-admin.tsx';
import { AdminParagraphs } from '../../components/navigation-admin/config/navigation-config';

import styles from './admin-page.module.scss';

export const AdminPage = () => {
    const { paragraph } = useParams();

    return (
        <section className={styles.adminPage}>
            {paragraph === AdminParagraphs.BOOKS && <BooksListAdmin />}
            {paragraph === AdminParagraphs.USERS && <UsersListAdmin />}
        </section>
    );
};
