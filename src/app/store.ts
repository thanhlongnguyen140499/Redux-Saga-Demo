import {helloSaga} from '../saga/sagas';
import userSlice from '../features/user/userSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: any[] = [
  /* other middlewares */
  sagaMiddleware,
];

const appReducers = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: appReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(middlewares as any),
});

sagaMiddleware.run(helloSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
