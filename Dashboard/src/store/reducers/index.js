import { combineReducers } from 'redux';

import { UserCheck } from './user/user_check';

const reducers = combineReducers({
    UserCheck:UserCheck,
})

export default reducers;