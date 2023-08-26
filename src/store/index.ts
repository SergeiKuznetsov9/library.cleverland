import { createReduxHistoryContext } from 'redux-first-history';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';

import { authSlice } from './auth';
import { booksSlice } from './books';
import { clientsSlice } from './clients';
import { rootSaga } from './saga';
import { searchSlice } from './search';
import { userSlice } from './user';
import { viewSlice } from './view';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createHashHistory(),
});

export const reducer = {
    router: routerReducer,
    books: booksSlice.reducer,
    search: searchSlice.reducer,
    view: viewSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    clients: clientsSlice.reducer,
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(sagaMiddleware)
            .concat(routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
