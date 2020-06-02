import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import userSaga from './user/saga';
import CompanySaga from './company/saga';


export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        userSaga(),
        CompanySaga()
    ]);
}
