import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthForm } from './components/forms/auth-form';
import { RecoverForms } from './components/forms/recover-forms';
import { RegisterForm } from './components/forms/register-form';
import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { ROUTES } from './constants/routes';
import { AdminRoute } from './middlewares/admin-route';
import { ProtectedRoute } from './middlewares/protected-route';
import { AdminPage } from './pages/admin';
import { AdminUserInfo } from './pages/admin-user-info';
import { Auth } from './pages/auth';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { Terms } from './pages/terms';
import { reportWebVitals } from './report-web-vitals';
import { store } from './store';

import './index.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route element={<Auth />}>
                    <Route path={ROUTES.auth} element={<AuthForm />} />
                    <Route path={ROUTES.registration} element={<RegisterForm />} />
                    <Route path={ROUTES.recovery} element={<RecoverForms />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.main} element={<Layout />}>
                        <Route element={<LayoutMainPage />}>
                            <Route
                                path={ROUTES.main}
                                element={<Navigate to={ROUTES.allCategories} />}
                            />
                            <Route path={ROUTES.bookCategory} element={<MainPage />} />
                            <Route path={ROUTES.terms} element={<Terms contentView='terms' />} />
                            <Route
                                path={ROUTES.contract}
                                element={<Terms contentView='contract' />}
                            />
                            <Route element={<AdminRoute />}>
                                <Route
                                    path={ROUTES.admin}
                                    element={<Navigate to={ROUTES.adminBooks} />}
                                />
                                <Route path={ROUTES.adminParagraph} element={<AdminPage />} />
                            </Route>
                        </Route>
                        <Route path={ROUTES.adminUser} element={<AdminUserInfo />} />
                        <Route path={ROUTES.bookDetail} element={<BookPage />} />
                        <Route path={ROUTES.profile} element={<ProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
