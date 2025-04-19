import * as userCheck from '../actions/user/user_check'
import * as TableSelect from './tables/table_id';
import * as Cart_id from './cart/cart_id';

export const actions = Object.assign(
    userCheck,
    Cart_id,
    TableSelect
);