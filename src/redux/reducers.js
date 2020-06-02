import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import User from './user/reducers';
import Company from './company/reducers';

export default combineReducers({
    Auth,
    User,
    Company
});
