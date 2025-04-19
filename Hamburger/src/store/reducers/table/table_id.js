import createReducer from '../../../lib/createReducer'
import * as types from '../../actions/type.js';

const initialState = {
  table_id:null
};

export const Table_id = createReducer(initialState, {
  [types.TABLE_SELECT](state,action) {
    return { 
        ...state,  
        table_id:action.table_id  
    };
  },
});