import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { getUserFullInfoSelector } from '../store/user/selectors';

export const AdminRoute = () => {
    const { role } = useAppSelector(getUserFullInfoSelector);

    if (role.type !== 'admin') return null;

    return <Outlet />;
};
