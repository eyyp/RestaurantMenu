import * as types from '../type.js'

export const Cart_id = (cart_id) => {
    return {
        type:types.CART_SELECT,
        cart_id
    }
}
