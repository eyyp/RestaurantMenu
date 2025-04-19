import { combineReducers } from 'redux';

import { UserCheck } from './user/user_check';
import { Table_id } from './table/table_id';
import { Cart_id } from './cart/cart_id';

const reducers = combineReducers({
    UserCheck:UserCheck,
    Table_id: Table_id,
    Cart_id: Cart_id
})

export default reducers;