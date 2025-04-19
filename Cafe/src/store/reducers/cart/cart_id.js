import createReducer from '../../../lib/createReducer'
import * as types from '../../actions/type.js';

const initialState = {
  cart_id:null
};

export const Cart_id = createReducer(initialState, {
  [types.CART_SELECT](state,action) {
    return { 
        ...state,  
        cart_id:action.cart_id  
    };
  },
});