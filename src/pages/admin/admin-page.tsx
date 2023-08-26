import { useParams } from 'react-router-dom';

import { BooksListAdmin } from '../../components/admin-components/books-list-admin';
import { ClientsListAdmin } from '../../components/admin-components/clients-list-admin/clients-list-admin';
import { AdminParagraphs } from '../../components/admin-components/navigation-admin/config/navigation-config';

export const AdminPage = () => {
    const { paragraph } = useParams();

    return (
        <section>
            {paragraph === AdminParagraphs.BOOKS && <BooksListAdmin />}
            {paragraph === AdminParagraphs.USERS && <ClientsListAdmin />}
        </section>
    );
};
