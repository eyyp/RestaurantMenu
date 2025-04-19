import createReducer from '../../../lib/createReducer'
import * as types from '../../actions/type.js';

const initialState = {
  userStatus: 'basic',
  userCheck: [],
};

export const UserCheck = createReducer(initialState, {
  [types.USER_CHECK_REQUEST](state) {
    return { 
        ...state,  
        userStatus:'onLoader'  
    };
  },

  [types.USER_CHECK_RESPONSE](state, action) {
    return {
      ...state,
      userStatus:'response',
      userCheck : action.response
    };
  },

  [types.USER_CHECK_END](state) {
    return { 
        ...state,
        userStatus:'end'
    };
  },

  [types.USER_CHECK_DISABLED_LOADER](state) {
    return { 
        ...state,
        userStatus:'disabledLoader'
    };
  },

  [types.USER_CHECK_FAILURE](state) {
    return {
      ...state,
      userStatus:'failure'
    };
  },
});